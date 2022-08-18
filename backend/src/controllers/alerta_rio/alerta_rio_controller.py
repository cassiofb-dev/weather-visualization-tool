from fastapi import APIRouter
from src.controllers.alerta_rio.alerta_rio_service import AlertaRioService

alerta_rio_service = AlertaRioService()

router = APIRouter()

@router.get("/data")
def get_data(
    start_time: str,
    end_time: str,
    seconds_interval: int,
    station: str = None,
):
    try:
        response = alerta_rio_service.get_data(
            start_time,
            end_time,
            seconds_interval,
            station,
        )
        return response
    except Exception as error:
        raise error