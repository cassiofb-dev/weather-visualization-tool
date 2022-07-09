import math, os
from datetime import timedelta
from dateutil.parser import isoparse
import pandas as pd

class AlertaRioService:
    def get_data(self, start_time, end_time, seconds_interval, station):
        DATA_DIR = "src/alerta_rio/data"
        FILES_PATH = [f"./{DATA_DIR}/{filename}" for filename in os.listdir(f"./{DATA_DIR}")]

        if station is not None:
            FILES_PATH = list(filter(lambda filename: filename.find(station) > 0, FILES_PATH))

        start_datetime = isoparse(start_time)
        end_datetime = isoparse(end_time)

        delta_time = end_datetime - start_datetime
        current_time = isoparse(start_datetime.isoformat())

        intervals_number = math.ceil(
            delta_time.total_seconds() / seconds_interval,
        )

        time_grouped_data = []
        for interval_index in range(intervals_number):
            group_start_time = isoparse(current_time.isoformat())
            current_time += timedelta(seconds=seconds_interval)
            current_time_group = {
                "group_start_time": group_start_time.isoformat(),
                "group_end_time": current_time.isoformat(),
                "group_observations_number": 0,
                "group_observations": [],
            }

            for file_path in FILES_PATH:
                observations_dict_list = self.alerta_rio_txt_to_dict_list(file_path)

                for (index, observation_dict) in enumerate(observations_dict_list):
                    observation_datetime = isoparse(observation_dict["datetime"])
                    if group_start_time <= observation_datetime and observation_datetime <= current_time:
                        current_time_group["group_observations"].append(
                            observation_dict,
                        )
                        del observations_dict_list[index]

                current_time_group["group_observations_number"] = len(
                    current_time_group["group_observations"],
                )

                time_grouped_data.append(current_time_group)

        return time_grouped_data

    def alerta_rio_txt_to_dict_list(self, txt_path: str):
        observations_df = pd.read_csv(
            filepath_or_buffer="src/alerta_rio/data/santa_cruz_202205_Met.txt",
            skiprows=[0, 1, 2, 3, 5],
            delimiter=r"\s+",
        )

        observations_dates = observations_df["Dia"].apply(
            lambda date: self.convert_brazilian_date_to_iso_date(date),
        )

        observations_times = observations_df["Hora"].apply(
            lambda time: time + ".000Z",
        )

        observations_df.drop(columns=["Dia", "Hora"], inplace=True)
        observations_df.rename(
            inplace=True,
            columns={
                "Chuva": "precipitation",
                "DirVento": "wind_direction",
                "VelVento": "wind_velocity",
                "Temperatura": "temperature",
                "Pressao": "pressure",
                "Umidade": "moisture",
            }
        )

        observations_iso_datetimes = observations_dates + "T" + observations_times

        observations_df["datetime"] = observations_iso_datetimes

        observations_df["source_file"] = txt_path

        return observations_df.to_dict(orient="records")

    def convert_brazilian_date_to_iso_date(self, date: str):
        date_list = date.split("/")
        date_list.reverse()

        iso_date = "-".join(date_list)

        return iso_date