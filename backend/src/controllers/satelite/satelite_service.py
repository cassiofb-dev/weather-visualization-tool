import netCDF4 as nc
import numpy as np
from datetime import timedelta
from dateutil.parser import isoparse
import xarray as xr
import os

class SateliteService:
    def get_data(self, time):
        DATA_DIR = "src/controllers/satelite/data"
        
        date_time = isoparse(time)
        year = date_time.year
        month = date_time.month
        day = date_time.day
        hour = date_time.hour

        # Adding 0 for the pattern '001', '002'...
        if month < 10:
            month = f"00{month}"
        else:
            month = f"0{month}"
        
        if hour < 10:
            hour = f"0{hour}"

        file_path = f"{DATA_DIR}/{year}/{month}/{hour}"
        response_list = []
        for file in os.listdir(file_path):
            ds = xr.open_dataset(f"{file_path}/{file}")
            
            try:
               ds = self.filter_coordinates(ds)
            except ValueError:
               print('ValueError')

            df = ds.to_dataframe()
            data = df.to_json()

        response_dict = {"data": data}
        return response_dict

    def filter_coordinates(self, ds:xr.Dataset):
       
        # ds = ds['event_energy'].where(
        #     ds['event_lat'] >= -24.0,
        #     drop=True)

        # ds = ds.where(
        #     ds['event_lat'] <= -22.5,
        #     drop=True)

        # ds = ds.where(
        #     ds['event_lon'] >= -43.8,
        #     drop=True)

        # ds = ds.where(
        #     ds['event_lon'] <= -43.0,
        #     drop=True)
        
        # return ds

        return ds['event_energy'].where(
            (ds['event_lat'] >= -24.0) & (ds['event_lat'] <= -22.5) & 
            (ds['event_lon'] >= -43.8) & (ds['event_lon'] <= -43.0))

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