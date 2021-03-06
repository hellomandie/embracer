import jsPDF from 'jspdf';
import getDots from './getDots';
import {
  getSelectedMeritDescription,
  getFlawDescription
} from './meritFlawUtils';
import { capitalizeFirstLetter } from './stringUtils';
import { getTraitNames } from './traitUtils';
import { getRitualsDescription } from './ritualUtils';
import { version, docUrl } from '../constants/application';
import {
  attributeTraitNames,
  attributeMaxDots,
  bonusAttributeMaxDots,
  standardTraitMaxDots,
  skillTraitDisplayNameOverride,
  backgroundTraitDisplayNameOverride,
  startingWillpower,
  humanity,
  moralityMaxDotsHumanity,
  moralityMaxDotsPath
} from '../constants/characterOptions';

// Units are mm
const sizeUSLetter = [279.4, 215.9]; // Note: specifying 'letter' later
const pageWidth = sizeUSLetter[1];
const pageHeight = sizeUSLetter[0];
const topMargin = 20;
const leftMargin = 15;
const columnWidth = 55;
const gutter = 8;
const defaultFontSize = 10;
const defaultDrawLineWidth = 0.2;
const defaultPageLineHeight = 6;
const dotRadius = 1.2;
const dotSpacing = 0.75;
const squareSpacing = 2;
const attributesTopMargin = 45;
const skillsTopMargin = 69;
const skillsRows = 10;
const midsectionTopMargin = 139;
const bloodSectionTopMargin = 208;
const bottomSectionTopMargin = 233;

const defaultPrintOptions = {
  fontName: 'times',
  fontStyle: 'normal',
  fontSize: defaultFontSize,
  align: 'left'
};

const getSquaresWidth = (squares, width) =>
  width * squares + squareSpacing * (squares - 1);

const getDotsWidth = maxDots =>
  dotRadius * 2 * maxDots + dotSpacing * (maxDots - 1);

export default class Pdf {
  constructor() {
    this.doc = new jsPDF({
      unit: 'mm',
      format: 'letter' // eventually should allow a4 - affects column width
    });

    this.currentYPosition = topMargin;

    this.column1XPosition = this.getColumnXPosition(1);
    this.column2XPosition = this.getColumnXPosition(2);
    this.column3XPosition = this.getColumnXPosition(3);
  }

  get pageCenter() {
    return pageWidth / 2;
  }

  printCharacter({
    archetype,
    clanName,
    bloodline,
    settingName,
    generationDetails,
    attributes,
    skills,
    backgrounds,
    disciplines,
    rituals,
    merits,
    flaws,
    morality,
    xp
  }) {
    const clan = clanName + (bloodline ? ` (${bloodline})` : '');

    this.printPageHeader();
    this.printLine('Player:', this.column1XPosition);
    this.printLine('Character:', this.column1XPosition);
    this.printLine('Archetype: ' + archetype, this.column1XPosition);
    this.print('Clan: ' + clan, this.column1XPosition);
    this.print('Setting/Sect: ' + settingName, this.column2XPosition);
    this.printLine(`Title: ${generationDetails.title}`, this.column3XPosition);
    this.printAttributes(attributes);
    this.printSkills(skills);
    this.printBackgrounds(backgrounds);
    this.printDisciplines(disciplines);
    this.printRituals(rituals);
    this.printMeritsFlaws(merits, flaws);
    this.printBlood(generationDetails);
    this.printWillpower();
    this.printMorality(morality);
    this.printHealth();
    this.printXP(xp);
    this.printBeastTraits();
    this.printStatus();
    this.printFooter();
  }

  moveToNextLine() {
    this.currentYPosition += defaultPageLineHeight;
  }

  moveToPreviousLine() {
    this.currentYPosition -= defaultPageLineHeight;
  }

  getColumnXPosition(columnNumber) {
    return leftMargin + (columnWidth + gutter) * (columnNumber - 1);
  }

  // Note side effects - make any calls to getTextWidth AFTER calling.
  print(text, x, y = this.currentYPosition, options = null) {
    let { fontName, fontStyle, fontSize, align } = {
      ...defaultPrintOptions,
      ...options
    };

    this.doc.setFont(fontName, fontStyle);
    this.doc.setFontSize(fontSize);
    this.doc.text(text, x, y, { align });
  }

  printLine(text, x, y = undefined, options = undefined) {
    this.print(text, x, y, options);
    this.moveToNextLine();
  }

  printPageHeader() {
    this.print("MIND'S EYE THEATRE", this.pageCenter, topMargin, {
      align: 'center'
    });

    this.print('VAMPIRE', this.pageCenter, topMargin + 8, {
      fontSize: defaultFontSize * 3,
      align: 'center'
    });

    this.print('THE MASQUERADE', this.pageCenter, topMargin + 11, {
      align: 'center'
    });
  }

  printHeaderLine(text) {
    this.print(text, this.pageCenter, undefined, {
      fontSize: defaultFontSize + 4,
      align: 'center'
    });

    const textWidth = this.doc.getTextWidth(text);
    const sideSpace = (pageWidth - textWidth) / 2;
    const lineY = this.currentYPosition - 1;

    this.doc.setLineWidth(defaultDrawLineWidth);
    this.doc.line(leftMargin, lineY, sideSpace, lineY);
    this.doc.line(pageWidth - sideSpace, lineY, pageWidth - leftMargin, lineY);

    this.moveToNextLine();
  }

  printColumnHeaderLine(text, x) {
    this.printLine(text, x + columnWidth / 2, undefined, {
      fontSize: defaultFontSize + 4,
      align: 'center'
    });
  }

  printHorizontalLine(y) {
    this.doc.setLineWidth(defaultDrawLineWidth);
    this.doc.line(leftMargin, y, pageWidth - leftMargin, y);
  }

  printDots(dots, maxDots, x, y) {
    this.doc.setLineWidth(defaultDrawLineWidth);

    const yOffset = -dotRadius;

    for (let i = 0; i < maxDots; i++) {
      const xOffset = dotRadius + i * dotRadius * 2 + i * dotSpacing;
      const style = i < dots ? 'FD' : 'S';
      this.doc.circle(x + xOffset, y + yOffset, dotRadius, style);
    }
  }

  printSquares(squares, width, x, y) {
    this.doc.setLineWidth(defaultDrawLineWidth);

    const yOffset = -width;

    for (let i = 0; i < squares; i++) {
      const xOffset = i * (width + squareSpacing);
      this.doc.rect(x + xOffset, y + yOffset, width, width, 'S');
    }
  }

  printTraitLine(displayName, dots, maxDots, x) {
    const dotsWidth = getDotsWidth(maxDots);
    const xOffset = columnWidth - dotsWidth;

    this.print(displayName, x);

    const textWidth = this.doc.getTextWidth(displayName);
    this.doc.setLineWidth(defaultDrawLineWidth);
    this.doc.line(
      x + textWidth,
      this.currentYPosition,
      x + xOffset,
      this.currentYPosition
    );

    this.printDots(dots, maxDots, x + xOffset, this.currentYPosition);

    this.moveToNextLine();
  }

  printAttributes(attributes) {
    this.currentYPosition = attributesTopMargin;

    this.printHeaderLine('Attributes');

    attributeTraitNames.forEach((name, index) => {
      const attribute = attributes[name];
      const columnXPosition = this.getColumnXPosition(index + 1);

      this.printTraitLine(
        capitalizeFirstLetter(name),
        getDots(attribute),
        attributeMaxDots,
        columnXPosition
      );

      this.printTraitLine(
        'Bonus Attributes',
        0,
        bonusAttributeMaxDots,
        columnXPosition
      );

      this.print(`Focus: ${attribute.focus || ''}`, columnXPosition);

      this.moveToPreviousLine();
      this.moveToPreviousLine();
    });
  }

  printSkills(skills) {
    const skillNames = getTraitNames(skills);

    this.currentYPosition = skillsTopMargin;
    this.printHeaderLine('Skills');
    const skillsColumnTopMargin = this.currentYPosition;

    skillNames.forEach((name, index) => {
      const displayName =
        skillTraitDisplayNameOverride[name] || capitalizeFirstLetter(name);
      const column = Math.floor(index / skillsRows) + 1;

      if (index % skillsRows === 0) {
        this.currentYPosition = skillsColumnTopMargin;
      }

      this.printTraitLine(
        displayName,
        getDots(skills[name]),
        standardTraitMaxDots,
        this.getColumnXPosition(column)
      );
    });
  }

  printBackgrounds(backgrounds) {
    const backgroundNames = getTraitNames(backgrounds);

    this.currentYPosition = midsectionTopMargin;

    this.printHorizontalLine(this.currentYPosition - 5);
    this.printColumnHeaderLine('Backgrounds', this.column1XPosition);

    backgroundNames.forEach(name => {
      const displayName =
        backgroundTraitDisplayNameOverride[name] || capitalizeFirstLetter(name);

      this.printTraitLine(
        displayName,
        getDots(backgrounds[name]),
        standardTraitMaxDots,
        this.column1XPosition
      );
    });
  }

  getShortDisciplineName(name) {
    return name
      .replace('Thaumaturgy', 'Thau.')
      .replace('Path of ', '')
      .replace(/ Path$/, '');
  }

  printDisciplinesForAffinity(allDisciplines, affinity) {
    const disciplines = allDisciplines[affinity];
    const disciplineNames = getTraitNames(disciplines);

    disciplineNames.forEach(name => {
      this.printTraitLine(
        this.getShortDisciplineName(name) +
          (affinity === 'outOfClan' ? '*' : ''),
        getDots(disciplines[name]),
        standardTraitMaxDots,
        this.column2XPosition
      );
    });
  }

  printDisciplines(disciplines) {
    this.currentYPosition = midsectionTopMargin;

    this.printColumnHeaderLine('Disciplines', this.column2XPosition);

    this.printDisciplinesForAffinity(disciplines, 'inClan');
    this.printDisciplinesForAffinity(disciplines, 'outOfClan');
    this.printLine('* - Out-of-clan', this.column2XPosition);
  }

  printRituals(rituals) {
    rituals.forEach(({ displayName, selected }) => {
      if (selected.length === 0) {
        return;
      }

      const description = getRitualsDescription(selected);

      this.printLine(
        `${displayName} Rituals:`,
        this.column2XPosition,
        undefined,
        { fontStyle: 'bold' }
      );

      this.printLine(description, this.column2XPosition);
    });
  }

  printMeritsFlaws(merits, flaws) {
    this.currentYPosition = midsectionTopMargin;

    this.printColumnHeaderLine('Merits & Flaws', this.column3XPosition);

    merits.forEach(merit => {
      this.printLine(
        getSelectedMeritDescription(merit, 'pt M'),
        this.column3XPosition
      );
    });

    flaws.forEach(flaw => {
      this.printLine(getFlawDescription(flaw, 'pt F'), this.column3XPosition);
    });
  }

  printBlood(generationDetails) {
    this.currentYPosition = bloodSectionTopMargin;

    this.printHorizontalLine(this.currentYPosition - 5);
    this.printColumnHeaderLine('Blood', this.column1XPosition);

    this.printLine(
      `Blood Pool: ${generationDetails.bloodPool}`,
      this.column1XPosition
    );

    this.printLine(
      `Blood/Turn: ${generationDetails.bloodPerTurn}`,
      this.column1XPosition
    );

    this.printLine(
      `Attribute Bonus: ${generationDetails.attributeBonus}`,
      this.column1XPosition
    );
  }

  printWillpower() {
    const squareWidth = 4;
    const squaresWidth = getSquaresWidth(startingWillpower, squareWidth);
    const xOffset = (columnWidth - squaresWidth) / 2;

    this.currentYPosition = bloodSectionTopMargin;

    this.printColumnHeaderLine('Willpower', this.column2XPosition);

    this.printSquares(
      startingWillpower,
      squareWidth,
      this.column2XPosition + xOffset,
      this.currentYPosition
    );
  }

  printMorality(morality) {
    this.currentYPosition = bloodSectionTopMargin;

    this.printColumnHeaderLine('Morality', this.column3XPosition);

    const path = morality.path;

    const maxDots =
      path === humanity ? moralityMaxDotsHumanity : moralityMaxDotsPath;

    this.printLine(path, this.column3XPosition);

    this.printDots(
      getDots(morality),
      maxDots,
      this.column3XPosition,
      this.currentYPosition
    );
  }

  printHealth() {
    const tracks = ['Healthy', 'Injured', 'Incapacitated'];
    const healthLevelsPerTrack = 3;
    const squareWidth = 4;
    const squaresWidth = getSquaresWidth(healthLevelsPerTrack, squareWidth);
    const xOffset = columnWidth - squaresWidth;

    this.currentYPosition = bottomSectionTopMargin;

    this.printHorizontalLine(this.currentYPosition - 5);
    this.printColumnHeaderLine('Health Levels', this.column1XPosition);
    this.moveToNextLine();

    tracks.forEach(track => {
      this.print(track, this.column1XPosition);

      this.printSquares(
        healthLevelsPerTrack,
        squareWidth,
        this.column1XPosition + xOffset,
        this.currentYPosition
      );

      this.moveToNextLine();
    });
  }

  printXP(xp) {
    const { spent, gainedFromFlaws, available, bankable } = xp;

    this.currentYPosition = bottomSectionTopMargin;

    this.printColumnHeaderLine('XP', this.column2XPosition);

    this.printLine(`Spent: ${spent}`, this.column2XPosition);
    this.printLine(
      `Gained from Flaws: ${gainedFromFlaws}`,
      this.column2XPosition
    );
    this.printLine(`Available: ${available}`, this.column2XPosition);
    this.printLine(`Bankable: ${bankable}`, this.column2XPosition);
  }

  printBeastTraits() {
    const maxBeastTraits = 5;
    const squareWidth = 3;
    const squaresWidth = getSquaresWidth(maxBeastTraits, squareWidth);
    const xOffset = (columnWidth - squaresWidth) / 2;

    this.currentYPosition = bottomSectionTopMargin;

    this.printColumnHeaderLine('Beast Traits', this.column3XPosition);

    this.printSquares(
      maxBeastTraits,
      squareWidth,
      this.column3XPosition + xOffset,
      this.currentYPosition
    );

    this.moveToNextLine();
    this.moveToNextLine();
  }

  printStatus() {
    const lineY = this.currentYPosition - 5;

    this.doc.setLineWidth(defaultDrawLineWidth);
    this.doc.line(this.column3XPosition, lineY, pageWidth - leftMargin, lineY);

    this.printColumnHeaderLine('Status', this.column3XPosition);
  }

  printFooter() {
    this.currentYPosition = pageHeight - topMargin + 10;

    this.print(
      `Created by Embracer v${version}  ${docUrl}`,
      this.column1XPosition
    );
  }

  downloadAs(filename) {
    this.doc.save(filename);
  }
}
