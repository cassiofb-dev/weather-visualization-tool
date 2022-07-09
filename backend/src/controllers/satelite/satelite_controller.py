from fastapi import APIRouter
from controllers.satelite.satelite_service import SateliteService

satelite = SateliteService()
router = APIRouter()

@router.get("/data")
def get_data(
    start_time: str,
    end_time: str,
    seconds_interval: int,
    station: str = None,
):
    try:
        response = satelite.get_data()
        return response
    except Exception as error:
        raise error