
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

# About The Project

In the midst of all covid19 apps and websites available, this project tries to visualize the recent Corona statistics about Germany.
The data is queried from a public accessible REST API.
Following interactive elements are implemented:

* **Selection of a region:** These regions are Germany in total or a single county such as Baden-Wuerttemberg, Rheinland-Pfalz, etc.
* **Time frame for the statistics:** 1,2,3,4 weeks back from now
   * The statistics covers: total number of *cases*, total number of *deaths* and total number of *recovered*. Each for the selected period of time (e.g. 2 weeks back from now).

The visualizations are done in such a way that change of control element changes all associated components used, for a better understanding of the underlying data.

![corona-stats-germany_website screenshot](https://user-images.githubusercontent.com/46843674/129482101-ad7fd8b5-bc9b-495b-9036-e275cc5f7c97.png)

# Getting Started 
To get a local copy up and running follow these steps.

## Installation

1. Clone the repo     
     ```sh
     git clone https://github.com/AAlagu/corona-dashboard-germany.git 
     ```      
3. Install YARN packages
      ```sh
      yarn install 
      ```
      
3. Runs the app in the development mode
      ```sh 
      yarn start 
      ```
    * Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Usage
On opening the site, the data for the Germany in total for the past 4 week time period is shown.
The searchbar could be used to look up for a specific state. At the same time the required state can also be selected from the table.
As data communicated from individual states to the respective health authorities are independent of one another and due to the delays over the weekend, the last updated time may vary And this is more pronounced over the weekend. 

# Acknowledgements
  * [Rest API](https://api.corona-zahlen.org)
  * [React Query](https://react-query.tanstack.com/)
  * [Recharts](https://recharts.org/)
  * [Ant Design](https://ant.design/)
