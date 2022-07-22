import netCDF4 as nc
import numpy as np
from datetime import timedelta
from dateutil.parser import isoparse
import xarray as xr
import os

class SateliteService:
    def get_data(self, time):
        DATA_DIR = "src/controllers/satelite/data"
        # YEAR_FOLDER = [f"{year_folder}" for year_folder in os.listdir(f"./{DATA_DIR}")]
        
        date_time = isoparse(time)
        year = date_time.year
        month = date_time.month
        day = date_time.day
        hour = date_time.hour
        
        # month_folder = [f"{folder}" for folder in os.listdir(f"{DATA_DIR}/{year}")]
        # Adding 0 for the pattern '001', '002'...
        if month < 10:
            month = f"00{month}"
        else:
            month = f"0{month}"
        
        file_path = f"{DATA_DIR}/{year}/{month}/{hour}"
        response_list = []
        for file in os.listdir(file_path):
            ds = xr.open_dataset(f"{file_path}/{file}")

            try:
               self.filter_coordinates(ds)
            except ValueError:
               print('ValueError')
            
            df = ds.to_dataframe()
            df = self.preparing_data(df)
            df_json = df.to_json(orient="records")
            response_list.append(df_json)

        response_dict = {"data": response_dict}
        # ds = xr.open_dataset(f'controllers/satelite/data/2022/001/00/{NC_FILE}')
        # rootgrp = Dataset("controllers/alerta_rio_service/data", "w", format="NETCDF4")
        return response_dict

    def filter_coordinates(ds:xr.Dataset):
        ds = ds['event_energy'].where(
            ds['event_lat'] >= -24.0,
            drop=True)

        ds = ds.where(
            ds['event_lat'] <= -22.5,
            drop=True)

        ds = ds.where(
            ds['event_lon'] >= -43.8,
            drop=True)

        ds = ds.where(
            ds['event_lon'] <= -43.0,
            drop=True)

        return ds

    def preparing_data(df):
        df.drop(df.columns[4:-1],
                    axis=1,
                    inplace=True)
                    
        df.drop(df.columns[0],
                axis=1,
                inplace=True)

        df.rename(columns={'event_time_offset': 'time',
                        'event_lat': 'lat',
                        'event_lon': 'lon',
                        'event_energy': 'energy'},
                inplace=True)

        df.set_index('time', inplace=True)

        return df