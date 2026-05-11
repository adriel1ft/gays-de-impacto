# Project Assessment Report

## Executive Summary
EquiDar is a hackathon-stage educational equity prototype focused on identifying public schools and municipalities in Paraíba (PB, Brazil) with higher infrastructure and learning-performance needs. The repository combines a FastAPI backend, a React frontend, educational datasets (IDEB + infrastructure), and exploratory notebook workflows.

Current state: the project demonstrates a credible end-to-end decision-support concept, but remains partially integrated. Core backend analytical routes exist for municipality, IDEB, infrastructure, and combined indicators, while parts of the frontend workflow remain mock-driven and some API contracts are inconsistent with backend endpoints.

Major findings:
- The project mission is clear and socially relevant: prioritize educational investment using transparent indicators.
- Experimental coherence is good: IDEB and infrastructure data are merged into actionable school-level and city-level outputs.
- Reproducibility is moderate-to-weak: dependencies are underdeclared in `requirements.txt`, there is no root technical documentation, and several modules are partially wired.
- Continuation potential is high if documentation and integration debt are addressed.

Strengths:
- Strong problem framing and stakeholder relevance.
- Meaningful dataset use (multi-source education indicators).
- Practical analytical API endpoints that can support decision workflows.

Limitations:
- Frontend/backend mismatch and placeholder logic in critical UX paths.
- Incomplete dependency/runtime specification.
- Sparse project-level documentation and absent experiment protocol narrative.

Continuation potential:
- High for portfolio/research hardening.
- Moderate for immediate operational pilot without additional engineering and validation work.

---

## Project Mission
Enable fairer public education resource allocation by surfacing school and municipal priority signals from IDEB and infrastructure indicators, with explainable outputs for planning actions.

## Research / Problem Domain
- Education data analytics and equity-oriented prioritization.
- Public policy support for municipal/state education management.
- Prototype decision intelligence combining performance and infrastructure dimensions.

## Intended Audience or Stakeholders
Primary audience (confirmed): public sector education managers.

Secondary stakeholders (inferred):
- Policy analysts and education secretariat technical teams.
- Civic/hackathon evaluators and portfolio reviewers.

## Functional or Experimental Overview
- Backend (`equidar-back`):
  - FastAPI application with routes for municipalities, scoring, IDEB, infrastructure, and combined indicators.
  - In-memory loading of municipality data + polygon geometry.
  - Rule-based composite scoring (`ScoringService`) with configurable weights and equity bonus.
  - IDEB ingestion service capable of handling wide/long formats and city-level school outputs.
  - Infrastructure service merging FUND and MED scores by school ID.
- Frontend (`equidar-front`):
  - Landing page and exploration interface.
  - Map visualization with Leaflet.
  - Ranking/exploration UI with significant mock data and placeholder processing.
  - School detail modal generating mocked narrative analyses.
- Experimental assets:
  - Notebooks (`ideb_data.ipynb`, `aggr.ipynb`) indicating exploratory ETL and aggregation.
  - Data exports and utility script (`export_mockup.py`) for Excel reporting from API responses.

## Repository / Study Structure Analysis
Observed structure quality:
- Clear top-level split: backend + frontend + data/notebooks.
- Backend has recognizable service/route layering.
- Frontend has feature components but mixed production/prototype concerns in single files.

Documentation state:
- No substantive root README.
- Frontend README is Vite template, not project documentation.
- No explicit architecture, setup, dataset provenance, or methodology document.

Data/asset organization:
- Data folder includes IDEB (anos iniciais/finais/médio), infrastructure scores, all-school tables, municipality samples/polygons.
- Dataset scale is meaningful for prototype exploration (thousands of rows in key files).

## Technologies, Frameworks, or Methodologies
- Backend: Python, FastAPI, Pydantic, Pydantic Settings.
- Data processing in code/notebooks: pandas, numpy, geopandas (imports observed).
- Frontend: React, TypeScript, Vite, Tailwind CSS, Leaflet, Axios.
- Methodological approach:
  - Indicator fusion (IDEB + infrastructure).
  - Heuristic/equity-weighted scoring for municipality prioritization.
  - City/school-level exploratory reporting.

## Current Maturity Assessment
Stage (confirmed): Prototype.

Maturity interpretation:
- Concept maturity: high.
- Data integration maturity: moderate.
- Engineering integration maturity: moderate-low.
- Documentation maturity: low.
- Research formalization maturity: moderate-low.

Confidence: high for architecture and implementation status; moderate for intended methodological rigor due to missing explicit protocol documentation.

---

# Scoring

## Complexity Score: 7.6/10
### Rationale
The project combines multiple dimensions of complexity: educational domain modeling, heterogeneous dataset handling, geospatial context, multi-endpoint analytical services, and a frontend decision-support interface. Complexity derives from integration and conceptual modeling rather than algorithmic novelty alone.

### Key Drivers
- Multi-source data fusion across IDEB and infrastructure datasets.
- Dual-level analysis (school and municipality perspectives).
- Geospatial component (municipality polygons and map interaction).
- Mixed synchronous/asynchronous service interactions and API surface.
- Social-policy framing requiring interpretability and actionable outputs.

### Notable Challenges
- Data consistency across naming conventions, IDs, and year schemas.
- Maintaining coherent scoring semantics across routes and UI.
- Converting prototype narratives into evidence-backed explanation layers.

---

## Readiness Score: 5.8/10
### Rationale
For a prototype objective, readiness is moderate: there is a demonstrable flow and useful analytical endpoints, but reproducibility and integration gaps reduce practical handoff quality. This score intentionally does not penalize missing production-grade deployment features as primary criteria.

### Missing Elements
- Complete dependency specification (`requirements.txt` omits key imported libs such as pandas/numpy/geopandas/requests/xlsxwriter).
- Cohesive setup/run documentation (backend, frontend, data assumptions, environment variables).
- API contract consistency between frontend calls and available backend endpoints.
- Formal evaluation protocol (baseline comparisons, metric definitions, result interpretation rules).

### Continuation Feasibility
High for continued research/portfolio development because:
- Core data and service scaffolding already exist.
- Useful analytical primitives are present.
- Clear next-step path: documentation hardening, endpoint alignment, and validation workflow.

---

## Documentation / Documentability Score: 4.9/10
### Rationale
The project is partially recoverable due to understandable code organization and self-evident domain naming, but explicit documentation is insufficient for fast onboarding or reproducible reruns by external collaborators.

### Recoverability Assessment
Recoverable with moderate effort:
- Positive: route/service decomposition, notebook artifacts, meaningful file naming, visible datasets.
- Negative: missing project narrative, sparse execution instructions, absent methodology memo, and inconsistent module completeness.

### Suggested Improvements
- Add a root README with mission, architecture, quickstart, and known limitations.
- Add a reproducibility guide (data files, versions, environment, expected outputs).
- Add a methodology note defining score formulas, assumptions, and interpretation boundaries.
- Add an API contract table mapping frontend calls to backend routes.

---

# Strengths
- Strong social-impact mission aligned with measurable education indicators.
- Good conceptual integration between infrastructure and learning-performance perspectives.
- Meaningful prototype architecture with backend analytical services and visualization-oriented frontend.
- Presence of exploratory notebooks and export scripting that support iterative investigation.
- Clear potential as a portfolio artifact and as a base for deeper research validation.

# Weaknesses
- Incomplete and inconsistent technical documentation.
- Runtime dependency under-specification harms reproducibility.
- Frontend relies heavily on mock paths for central interactions.
- Some backend modules/routes appear partially wired or inconsistent with declared models/services.
- Limited formal evidence of quantitative validation outcomes.

# Risks or Gaps
- Risk of stakeholder over-trust if mocked/heuristic outputs are interpreted as validated intelligence.
- Risk of onboarding friction for new collaborators due to missing setup/method docs.
- Risk of integration drift between frontend expectations and backend contract.
- Risk of fragile reruns across environments due to undeclared data-science/geospatial dependencies.

# Suggested Next Steps
1. Produce a root technical README (mission, architecture, setup, execution order, known prototype constraints).
2. Reconcile frontend API calls with actual backend routes and response shapes.
3. Expand backend dependency manifest to include all imported runtime libraries.
4. Add a concise methodology document defining indicators, formulas, normalization, and caveats.
5. Add a minimal verification suite (endpoint smoke tests + dataset presence checks).

# Potential Future Directions
- Add formal evaluation benchmarks (e.g., ranking stability, sensitivity analysis for weight changes).
- Introduce scenario simulation for policy interventions (what-if analysis).
- Replace mocked narrative generation with controlled prompt templates over validated indicators.
- Add municipal dashboard snapshots and comparative trend reports for stakeholder briefings.
- Prepare a publication-style technical report if transitioning toward academic dissemination.

---

# Appendix

## Notable Files
- `equidar-back/app/main.py`: API lifecycle, route registration, CORS.
- `equidar-back/app/services/ideb.py`: IDEB ingestion/normalization and city-school outputs.
- `equidar-back/app/services/infra.py`: infrastructure score loading and merge logic.
- `equidar-back/app/services/scoring.py`: composite municipality scoring heuristic.
- `equidar-back/app/routes/indicadores.py`: combined IDEB + infrastructure city indicators.
- `equidar-front/src/components/EquiDar.tsx`: primary exploration UI (mixed real/mocked behavior).
- `equidar-front/src/components/SchoolDetails.tsx`: modal with mocked analysis narratives.
- `equidar-back/aggr.ipynb`, `ideb_data.ipynb`: exploratory data preparation and aggregation traces.

## Datasets
- IDEB CSVs (PB): anos iniciais, anos finais, ensino médio.
- Infrastructure score CSVs (PB): fundamental and médio.
- Aggregated school-level datasets.
- Municipality sample JSON and municipality polygons JSON.

## Important Modules
- Services: municipalities, ideb, infra, scoring, agent.
- Routes: municipalities, scores, ideb, infra, indicadores, agents.
- Frontend API layer: `EquidarService` and base `ApiService`.

## Experiment Observations
- Indicators are integrated using practical heuristics suitable for prototype decision support.
- Notebook artifacts suggest exploratory ETL and score-building workflows.
- UI communicates prioritization intent effectively, but many outputs remain demonstrative.

## Inferred Architecture
- Data files loaded locally into backend process memory.
- Service-layer computation exposed through REST endpoints.
- Frontend consumes endpoints while partially retaining static/mock datasets.
- Optional AI-assist path currently represented by echo/mock behavior rather than a validated model pipeline.

## Assumptions vs Confirmed Findings
Confirmed (from repository + user input):
- Goal: hackathon prototype for decision-support demonstration.
- Audience: public sector education managers.
- Stage: prototype.
- Success lens: demo quality and practical narrative.
- Outcomes: informal qualitative.
- Continuation plan: strengthen as research/portfolio artifact.
- No formal academic linkage.

Assumptions (inferred):
- Primary geographic scope is Paraíba due to dataset naming and city references.
- Current “AI” value is mostly explanatory/prototype-level, not benchmark-validated predictive modeling.
