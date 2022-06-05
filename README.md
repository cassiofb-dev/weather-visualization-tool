<h1 align="center">
  WVTool
</h1>

<h4 align="center">
  WVTool - Weather Visualization Tool
</h4>

<p align="center">
  <a href="#about">About</a> •
  <a href="#features">Features</a> •
  <a href="#install">Install</a> •
  <a href="#workflow">Workflow</a> •
  <a href="#architecture-diagram">Architecture Diagram</a> •
  <a href="#project-requirements">Project Requirements</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

![cefet](https://i.imgur.com/K0E5iFC.jpg)

## About

WVTool stands for Weather Visualization Tool. WVtool is a project that its main goal
is to visualize GOES-16 weather data for Rio de Janeiro region. This project is done
by CEFET/RJ CC course students.

## Features

* Interactive Weather Map
  * Zoom in
  * Zoom out
  * Translation
* Multilayer
  * Select different map layers
  * Select different weather features layers

## Install

For running this project locally you will need to install:

1. [Git](https://github.com/git/git)
2. [Node.js](https://nodejs.org/en/)

```bash
# Clone the repository
git clone https://github.com/cassiofb-dev/weather-visualization-tool

# Go into project directory
cd weather-visualization-tool

# Go into frontend directory
cd frontend

# Install frontend dependencies
npm i

# Start frontend application
npm start
```

## Workflow

For deploying new code on production enviroment, the WVTool's team uses [Vercel](https://vercel.com) for the frontend. This project uses 3 types of enviroments:

1. Production - Code found in master branch, stable releases.
2. Preview - Code found in dev branch where the new features are gathered. If no bugs are found and the team approve the changes it goes into master then production enviroment.
3. Staging - Code found in each individual feature branch, this helps isolating a feature for testing. In case that no bugs are found, the team can approve this branch to go into dev then the code will be deployed to preview enviroment.

Below is a image to better visualization of this project workflow.

![workflow](https://i.imgur.com/dQhte2C.png)

## Architecture Diagram

As this project uses geospatial data, the WSM protocol. The following explanation and image are from the academic paper: Walker, A. & Pham, Binh & Maeder, Anthony. (2004). A bayesian framework for automated dataset retrieval in geographic Information Systems. Proceedings - 10th International Multimedia Modelling Conference, MMM 2004. 138- 144. 10.1109/MULMM.2004.1264978.

> WMS provides the ability to download maps from WMS servers, thus, allowing different datasets from different WMS servers as well as local data to easily be combined into single map visualization. WMS uses client-server architecture as shown in Figure 1.

![wms-archtecture](https://i.imgur.com/sGRPi4s.png)

## Project Requirements

The original requirement document can be found in this [link](https://github.com/cassiofb-dev/weather-visualization-tool/tree/master/docs/assets/PCS2022.1-Projeto1-wvtool_compressed.pdf).

### Functional Requirements

1. As a background resource, the app must allow users to configurate the local data repository.
   1. The data must not be alterated in comparison to its font.
2. The app must consume the weather data in local repository.
3. The user can choose the weather variable.
4. The app main view must have 3 layers:
   1. Layer 1: Rio de Janeiro map.
   2. Layer 2: Weather geospatial  data in timelapse animation.
   3. Layer 3: 7x7 Grid over Rio de Janeiro area.
5. The app must allow user controls like: zoom in, zoom out and translation.
6. The app main view must be a timelapse wather geospatial data animation. It must show the evolution of the choosed weather variable:
   1. The animation must show data grouped by a time interval of 15 minutes.
   2. The animation must be controlled by a control bar.
   3. The control bar must allow users to define the inital and final datetime.
   4. The control bar must allow users to pause visualization.
   5. The control bar must allow users to skip to the previos or next period.
7. The app must have, as auxiliary views, plot of the geospatial data provided by weather stations:
   1. Each plot must be linked to a dropdown that allows users to choose one of the 49 grid cells.
   2. The plot must show the data linked to weather station observations in the selected grid area.
   3. Each plot must show the precipitation data as a line plot in which the x axis contains the time dimension and y axis contains the observation value.
   4. The plot must evolve as an animation that is linked to the main view time and the current time in the main view must be the central time in the auxiliary view.
   5. In each animated interation, the auxiliary view plot must show the observations of the 12 previous and next periods.
8. The app must allow users to download the animation as a animated gif or a png image of the current interation.

### Non-functional Requirements

1. Beside the app source code, the items bellow must also be included as tasks:
   1. <a href="#install">Installation and configuration documentation</a>.
   2. <a href="#architecture-diagram">Architecture diagram</a>.
   3. Class diagram.
2. The app development must be evolutive and versioned on github.
3. The github repository must be shared to show the app evolution.
4. The first task must be done as a read me markdown file on github.
5. The tasks 1.2, 1.3 and 1.4 must be in docs directiory.

## Credits

This app uses the following open source projects:

* [Git](https://github.com/git/git)
* [Node.js](https://nodejs.org/en/)
* [Angular](https://github.com/angular/angular)
* [Leaflet](https://github.com/Leaflet/Leaflet)

## License

MIT

---

> Vitória Santos [@viisantos](https://github.com/viisantos) &nbsp;&middot;&nbsp;
> Cásio Fernando [@cassiofb-dev](https://github.com/cassiofb-dev) &nbsp;&middot;&nbsp;
> Dennis [@dennissrn](https://twitter.com/dennissrn)
