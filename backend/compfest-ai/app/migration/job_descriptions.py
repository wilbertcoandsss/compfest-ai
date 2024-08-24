import os
import pandas as pd

def load_data(path: str, debug=False):
    df = pd.read_csv(path, on_bad_lines='skip', nrows=10000) 
    if debug:
        print(f'Number of rows :', {df.shape[0]})
        print(f'Info: {df.info()}')

    return df

