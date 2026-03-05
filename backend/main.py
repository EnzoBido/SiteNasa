import os
import requests
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="NASA APOD API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import certifi
import urllib3

# Suppress insecure request warnings if you choose to use verify=False
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

NASA_API_KEY = os.getenv("NASA_API_KEY")

@app.get("/api/nasa-photo")
async def get_nasa_photo(date: str = Query(..., pattern=r"^\d{4}-\d{2}-\d{2}$")):
    """
    Fetch APOD data from NASA API for a specific date.
    Date format: YYYY-MM-DD
    """
    if not NASA_API_KEY:
        raise HTTPException(status_code=500, detail="NASA_API_KEY not found in environment")

    nasa_url = f"https://api.nasa.gov/planetary/apod?api_key={NASA_API_KEY}&date={date}"
    
    try:
        # Bypassing SSL verification (verify=False) because of local firewall/proxy issues
        # This is strictly for development in environments with SSL-inspecting proxies
        response = requests.get(nasa_url, verify=False)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        # Pass through NASA API errors (e.g., date out of range)
        error_detail = response.json().get("msg", "Error fetching data from NASA API")
        raise HTTPException(status_code=response.status_code, detail=error_detail)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
