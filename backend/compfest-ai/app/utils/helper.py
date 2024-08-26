import itertools

def chunks(iterable, batch_size=200):
    """
    A helper function to break an iterable into chunks of size batch_size.
    """
    it = iter(iterable)
    chunk = tuple(itertools.islice(it, batch_size))
    while chunk:
        yield chunk
        chunk = tuple(itertools.islice(it, batch_size))

"""
#UNUSED
#Flattend dictionary into string, idk if work or not
"""


def flatten_metadata(metadata: dict) -> dict:
    flat_metadata = {}

    # Helper function to handle nested dictionaries and convert everything to string
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
                    concatenated_skills = ', '.join(item['name'] for item in value if 'name' in item)
                    items[new_key] = concatenated_skills
                elif all(isinstance(item, dict) for item in value):
                    for i, item in enumerate(value):
                        items.update(flatten_dict(item, f"{new_key}_{i}"))  # Flatten each dictionary in list
                else:
                    # Convert list to string representation
                    items[new_key] = str(value)
            else:
                items[new_key] = str(value)  # Convert all other values to string
        return items

    flat_metadata.update(flatten_dict(metadata))
    return flat_metadata

