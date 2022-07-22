from fastapi import APIRouter
from src.controllers.satelite.satelite_service import SateliteService

satelite = SateliteService()
router = APIRouter()

@router.get("/data")
def get_data(time: str):
    try:
        response = satelite.get_data(time)
        return response
    except Exception as error:
        raise error