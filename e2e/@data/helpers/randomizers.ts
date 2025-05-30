import * as faker from 'faker';
import * as zipcodes from 'zipcodes';
import genders from '../../../../assets/genders';
import relationshipTypes from '../../../../assets/relationshipTypes';

const moment = require('moment');
const randexp = require('randexp').randexp;

type gender = 'Male' | 'Female' | 'Prefer not to answer';
function getGender(options?: { restrict: gender[] }) {
    const genderNames = options ? options.restrict : genders.map(gender => gender.name);
    const randomIndex = Math.round(Math.random() * (genderNames.length - 1));
    return genderNames[randomIndex];
}

type relationshipType =
    | 'Spouse'
    | 'Parent'
    | 'Child'
    | 'Legal Representative'
    | 'Prescriber'
    | 'Practice'
    | 'Pharmacy'
    | 'Hospital'
    | 'Office Contact'
    | 'Other';
function getPatientRelationship(options?: { restrict: relationshipType[] }) {
    const relationships = options ? options.restrict : relationshipTypes.map(rel => rel.description);
    const randomIndex = Math.round(Math.random() * (relationships.length - 1));
    return relationships[randomIndex];
}

function getDob(minAge: number, maxAge: number): string {
    const oldestDob = getPastDate(maxAge);
    const youngestDob = getPastDate(minAge);
    return moment(faker.date.between(oldestDob, youngestDob)).format('L');
}

function getFutureDate(): string {
    return moment(faker.date.future()).format('L');
}

function getVampireDate(): string {
    return moment(getPastDate(150)).format('L');
}

function getPastDate(yearsAgo: number) {
    const today = new Date();
    const pastTimestamp = new Date().setFullYear(today.getFullYear() - yearsAgo);
    return new Date(pastTimestamp);
}

function getZip() {
    return zipcodes.random().zip;
}

function getPhone() {
    return randexp(/^[2-9]\d{2}[2-9]\d{6}$/);
}

const randomizers = {
    getGender,
    getPatientRelationship,
    getDob,
    getFutureDate,
    getVampireDate,
    getZip,
    getPhone,
};

export default randomizers;
