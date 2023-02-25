<br />
<h3 align="center">Multiworkers-scraping</h3>
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://github.com/RomainC75/multiworkers_scraping/raw/main/images/scrape-multi-workers-schema.png" alt="Logo" width="300" height="300">
  </a>
  
</div>

## About The Project

With this project, I wanted to split a scraping script into micro-services. The target website was [this](https://scrapeme.live/shop/).
It about pokemon, gotta catch em all !!
Finally, I wanted to be able to follow the scraping process results on a webpage.

So basicaly, I have a few containers to do this :

- 1 x MySQL,
- 1 x Node/Express Backend,
- 1 x React frontend server,
- 1 x Main Scraper worker to get the main infos from the main page,
- 3 x secondary Workers to get the details from the urls the main worker got from the main page.

To do this, I focused on some technical things:

- Dockerfile and Docker-compose.yaml files to build containers and orchestrate the run :smile::smile::smile:,
- I wrote a personnal ORM to handle the SQL requests with mysql2,
- Socket.io to send informations about the results to the frontend,
- Chart.js to display the results,
- Tests with Jest and supertest

There is nothing special about the interface, because it's supposed to run on a personnal computer/server. But the next iteration might be a bigger app :wink:

### Built With

- ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
- ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
- ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

## Getting Started

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/RomainC75/multiworkers_scraping.git
   ```
2. Install NPM packages
   ```sh
   docker compose build
   ```
3. Install NPM packages
   ```sh
   docker compose up
   ```

<!-- USAGE EXAMPLES -->

## Usage

Go to the page http://localhost:3000 to watch the chart grow.

<div align="center">
    <img src="https://github.com/RomainC75/multiworkers_scraping/raw/main/images/screen.png" alt="Logo" width="200" height="200">
</div>

<!-- CONTRIBUTING -->

## Something strange ?

Clearly, MySQL is not the best option for this kind of use. The cache system of MySql hide a part of the real time informations, that's why the chart doesn't grow smoothly. So I think Redis would be a way better !

## Author

Romain Chenard

My [linkedIn](https://www.linkedin.com/in/romain-chenard/)
