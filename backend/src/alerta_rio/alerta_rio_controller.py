from fastapi import APIRouter

from src.alerta_rio.alerta_rio_service import AlertaRioService

alerta_rio_service = AlertaRioService()

alerta_rio_controller = APIRouter(
    prefix="/alerta-rio",
    tags=["alerta-rio"],
    responses={404: {"description": "Not found"}},
)


@alerta_rio_controller.get("/data/{start_time}/{end_time}/{seconds_interval}")
def get_data(start_time: str, end_time: str, seconds_interval: int):
    try:
        response = alerta_rio_service.get_data(
            start_time,
            end_time,
            seconds_interval,
        )
        return response
    except Exception as error:
        raise error
