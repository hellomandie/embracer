import React from 'react';
import { Route, Link } from 'react-router-dom';
import {
  skillTraitNames,
  skillTraitDisplayNameOverride,
  backgroundTraitNames,
  backgroundTraitDisplayNameOverride
} from '../constants/characterOptions';
import BasicInfoContainer from '../containers/BasicInfoContainer';
import AttributesContainer from '../containers/AttributesContainer';
import TraitCategoryContainer from '../containers/TraitCategoryContainer';
import DisciplinesContainer from '../containers/DisciplinesContainer';
import MeritsFlawsContainer from '../containers/MeritsFlawsContainer';
import XPContainer from '../containers/XPContainer';
import BloodContainer from '../containers/BloodContainer';
import PencilEraserContainer from '../containers/PencilEraserContainer';
import Morality from '../components/Morality';

const skills = (
  <TraitCategoryContainer
    categoryName="skills"
    traitNames={skillTraitNames}
    traitDisplayNameOverride={skillTraitDisplayNameOverride}
  />
);

const backgrounds = (
  <TraitCategoryContainer
    categoryName="backgrounds"
    traitNames={backgroundTraitNames}
    traitDisplayNameOverride={backgroundTraitDisplayNameOverride}
  />
);

const disciplines = (
  <div>
    <DisciplinesContainer affinity="inClan" />
    <hr />
    <DisciplinesContainer affinity="outOfClan" />
  </div>
);

const meritsFlaws = (
  <div>
    <MeritsFlawsContainer type="merits" />
    <hr />
    <MeritsFlawsContainer type="flaws" />
  </div>
);

const morality = (
  <Morality
    path="Humanity"
    level={5}
    maxDots={6}
    purchaseOrUnpurchaseDot={() => console.log('click')}
  />
);

const App = () => (
  <div>
    <h2>Embracer</h2>
    <BasicInfoContainer />
    <XPContainer />
    <BloodContainer />
    <PencilEraserContainer />
    <hr />
    <Link to="/">Attributes</Link> |
    <Link to="/skills">Skills</Link> |
    <Link to="/backgrounds">Backgrounds</Link> |
    <Link to="/disciplines">Disciplines</Link> |
    <Link to="/merits_flaws">Merits / Flaws</Link> |
    <Link to="/morality">Morality</Link>
    <Route exact path="/" component={AttributesContainer} />
    <Route path="/skills" render={() => skills} />
    <Route path="/backgrounds" render={() => backgrounds} />
    <Route path="/disciplines" render={() => disciplines} />
    <Route path="/merits_flaws" render={() => meritsFlaws} />
    <Route path="/morality" render={() => morality} />
  </div>
);

export default App;
