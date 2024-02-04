<div align="center">
  <h1>Web Application Development - Migrations Reporting Tool</h1> 
  
  <p>
    This is the public wiki associated to the WADe project repository that record the solution's progress. Our site is hosted and can be found <a href="https://migrationreportingtool.web.app/">here.</a>
  </p>
  
  
<!-- Badges -->
<p>
  <a href="https://github.com/Dragos101/ProiectWeb/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/Dragos101/ProiectWeb" alt="contributors" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/Dragos101/ProiectWeb" alt="last update" />
  </a>
  <a href="https://github.com/Dragos101/ProiectWeb/issues/">
    <img src="https://img.shields.io/github/issues/Dragos101/ProiectWeb" alt="open issues" />
</p>
   
<h4>
    <a href="https://app.swaggerhub.com/apis/DragosBaciu/MIR-Template/1.0.0#/Migrations/get_migration__userId_">Open API Specification</a>
  <span> · </span>
    <a href="https://github.com/Dragos101/ProiectWeb/tree/main/Documentation/Diagrams">Use-Case, Context and Components C4 Diagrams</a>
  <span> · </span>
    <a href="https://htmlpreview.github.io/?https://github.com/Dragos101/ProiectWeb/blob/main/Documentation/Scholarly/index.html">Scholarly HTML Demo</a>
  <span> · </span>
    <a href="https://github.com/Dragos101/ProiectWeb/blob/main/README.md">README as public wiki</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->
# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
- [Project Progress](#card_index_dividers-project-progress)
- [Team](#handshake-team)
- [Acknowledgements](#gem-acknowledgements)
- [Required Tagging](#required-tagging)

  

<!-- About the Project -->
## :star2: About the Project 

Considering observations provided by users (<em>e.g.</em>, messages posted on a social network) or various sensors, develop an "intelligent"
Web system capable to generate in real-time <a href="https://wiki.openstreetmap.org/wiki/Develop" title="Details">an interactive map</a> regarding the migrations performed by various entities (birds, humans, robots, extraterrestrial beings) in a specific context (season, working, politic factors, calamity). A migration-related event could be directly reported – in conjunction to the GPS info + optional (meta)data – into the implemented platform or by using <code>#mig-here</code> hashtag on an existing social Web application (Instagram, Twitter, Vimeo). Several useful statistics and visualizations about the migratory habits of specific species – including information on <a href="http://www.geonames.org/ontology/documentation.html" title="Details about GeoNames">geographical areas</a>, <a href="https://github.com/caesar0301/awesome-public-datasets#climate-weather" title="Climate/Weather data sources">climate</a>, seasons, user comments/images/videos, etc. – should be offered by a SPARQL endpoint – possibly enhanced by additional knowledge provided by DBpedia and/or Wikidata. Visit also <a href="https://www.migrationdataportal.org/" title="Migration Data Portal">Migration Data Portal</a>. Bonus: adopting a <a href="https://manuzhang.github.io/awesome-streaming/" title="Resources of interest">stream processing</a> approach.</p>

## :card_index_dividers: Project Progress

  - [Open API Specification](https://app.swaggerhub.com/apis/DragosBaciu/MIR-Template) - Dragos Baciu
  - [Diagrams](https://github.com/Dragos101/ProiectWeb/tree/main/Documentation/Diagrams) - Lupu Cezar (Context and Components Diagrams) (50%) + Baciu Dragos (Use Case Diagrams)(50%)
  - [Scholarly HTML code](https://github.com/Dragos101/ProiectWeb/blob/main/Documentation/Scholarly/index.html) - Lupu Cezar (75%) + Baciu Dragos(25%)
  - [README as public wiki](https://github.com/Dragos101/ProiectWeb/blob/main/README.md) - Lupu Cezar
  - [Develop frontend](https://github.com/Dragos101/ProiectWeb/tree/main/UI/mir-frontend) - Baciu Dragos (index page + migration details + migration index) and Lupu Cezar (add migration + edit migration page) - using Angular
  - [Develop backend](https://github.com/Dragos101/ProiectWeb/tree/main/BackEnd/mir-backend/mir-backend) - Baciu Dragos and Lupu Cezar (we worked together at the components of backend - AuthSystem, MigrationDbContext - using Stardog, SPARQL queries (from MigrationrRepository.cs)) - using dotnet;
  - [Deployment](https://migrationreportingtool.web.app/) - Baciu Dragos, using Microsoft Azure tools;

## :handshake: Team

<a href="https://github.com/Dragos101/ProiectWeb/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Dragos101/ProiectWeb" />
</a>

Send mail to:
<ul>
 <li>
   <a href="mailto:cezarlupu2012@gmail.com">Lupu Cezar-Justinian</a>
 </li>
 <li>
   <a href="mailto:baciu.dragos17@gmail.com">Baciu Dragos</a>
 </li>
</ul>
Project Link: https://github.com/Dragos101/ProiectWeb


<!-- Acknowledgments -->
## :gem: Acknowledgements

 - [Awesome README](https://github.com/Louis3797/awesome-readme-template/)
 - [C4 Diagrams](https://c4model.com/)
 - [Draw.io](https://www.drawio.com/)
 - [Scholarly HTML Template](https://w3c.github.io/scholarly-html/)
 - [Schema.org](https://schema.org/)
 - [Swagger API documation](https://swagger.io/solutions/api-documentation/)
 - [Deployment using Azure](https://azure.microsoft.com/)
 - [Stardog](https://www.stardog.com/)

## Required tagging

Visit also:
 - <wade> <a href="https://profs.info.uaic.ro/~busaco/teach/courses/wade/" title="WADe">Course Webpage</a></wade>
 - <infoiasi><a href="https://www.info.uaic.ro/" title="FII">Faculty Webpage</a></infoiasi>
 - <project><a href="https://profs.info.uaic.ro/~busaco/teach/courses/wade/web-projects.html" title="WADe projects">About WADe project</a></project>
 - <web><a href="https://profs.info.uaic.ro/~busaco/teach/courses/wade/web-film.html" title="Web presentation">Web presentation</a></web>

Tags: project, infoiasi, wade, web
<!-- Or, maybe, this is a better practice - 
<ul>
  <li class="wade">
    <a href="https://profs.info.uaic.ro/~busaco/teach/courses/wade/" title="WADe">Course Webpage</a>
  </li>
  <li class="infoiasi">
    <a href="https://www.info.uaic.ro/" title="FII">Faculty Webpage</a>
  </li>
  <li class="project">
    <a href="https://profs.info.uaic.ro/~busaco/teach/courses/wade/web-projects.html" title="WADe projects">About WADe project</a>
  </li>
  <li class="web">
    <a href="https://profs.info.uaic.ro/~busaco/teach/courses/wade/web-film.html" title="Web presentation">Web presentation</a>
  </li>
</ul>
-->

<!-- Or in this way

  <meta name="keywords" content="project, infoiasi, wade, web">
  
    <section id="project">
      <h2>Project</h2>
    </section>

-->
