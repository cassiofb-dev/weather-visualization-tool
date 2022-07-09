from netCDF4 import Dataset

class SateliteService:
    def get_data(self):
        rootgrp = Dataset("test.nc", "w", format="NETCDF4")
        return "rootgrp"