import itertools
from functools import wraps
from warnings import warn

def deprecated(func):
    """This decorator marks functions as deprecated."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        warn(f"{func.__name__} is deprecated.", DeprecationWarning, stacklevel=2)
        return func(*args, **kwargs)
    return wrapper


def chunks(iterable, batch_size=200):
    """
    A helper function to break an iterable into chunks of size batch_size.
    """
    it = iter(iterable)
    chunk = tuple(itertools.islice(it, batch_size))
    while chunk:
        yield chunk
        chunk = tuple(itertools.islice(it, batch_size))

def flatten_metadata(metadata: dict) -> dict:
    flat_metadata = {}

    def flatten_dict(d: dict, parent_key: str = '') -> dict:
        items = {}
        for key, value in d.items():
            new_key = f"{parent_key}_{key}" if parent_key else key  # Create a new key path
            if isinstance(value, dict):
                items.update(flatten_dict(value, new_key))  # Recursively flatten dictionaries
            elif isinstance(value, list):
                # Check if list contains dictionaries
                if all(isinstance(item, dict) for item in value) and key == 'skills':
                    # Concatenate skill names into a single string
                    concatenated_skills = '#'.join(item['name'] for item in value if 'name' in item)
                    items[new_key] = concatenated_skills
                elif all(isinstance(item, dict) for item in value):
                    for i, item in enumerate(value):
                        items.update(flatten_dict(item, f"{new_key}_{i}"))  # Flatten each dictionary in list
                else:
                    items[new_key] = str(value)
            else:
                items[new_key] = str(value) 
        return items

    flat_metadata.update(flatten_dict(metadata))
    return flat_metadata

