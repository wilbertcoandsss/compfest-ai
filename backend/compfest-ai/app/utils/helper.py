import itertools

def chunks(iterable, batch_size=200):
    """
    A helper function to break an iterable into chunks of size batch_size.
    """
    it = iter(iterable)
    chunk = tuple(itertools.islice(it, batch_size))
    while chunk:
        yield chunk
        chunk = tuple(itertools.islice(it, batch_size))""

"""
#UNUSED
#Flattend dictionary into string, idk if work or not
def flatten_metadata(metadata: dict) -> dict:
    
    flat_metadata = {}
    for key, value in metadata.items():
        if isinstance(value, list):
            if all(isinstance(item, dict) for item in value):
                flat_metadata[key] = [flatten_dict(item) for item in value]
            else:
                flat_metadata[key] = value
        elif isinstance(value, dict):
            for sub_key, sub_value in flatten_dict(value).items():
                flat_metadata[f"{key}_{sub_key}"] = sub_value
        else:
            flat_metadata[key] = value

    return flat_metadata
"""



"""
#UNUSED
#Recursive flatten
def flatten_dict(d: dict) -> dict:
    flat_dict = {}
    for key, value in d.items():
        if isinstance(value, dict):
            for sub_key, sub_value in flatten_dict(value).items():
                flat_dict[f"{key}_{sub_key}"] = sub_value
        else:
            flat_dict[key] = value
    return flat_dict
"""
