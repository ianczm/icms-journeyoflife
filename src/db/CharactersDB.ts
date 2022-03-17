// Retrieving characters

import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { Character } from "../classes/character/Character";

export enum DB {
  CHARACTER = "character",
  CHARACTER_SCENARIO = "character_scenario",
  SCENARIO = "scenario",
  AGENDA = "agaenda",
  USERS = "users"
}

export function getCharacterByUserID(userid: string): Character {
  const db = getFirestore();
  const q = query(collection(db, DB.CHARACTER), where("userid", "==", userid));
  var result;
  // should only return 1
  getDocs(q).then((characters) => {
    characters.forEach(character => {
      result = character.data() as Character;
    })
  })

  return Object.assign(new Character(0, 0), result);
}

export function getAllCharacters(): Array<Character> {
  const db = getFirestore();
  const c = collection(db, DB.CHARACTER);
  var results;
  // should only return 1
  getDocs(c).then((characters) => {
    characters.forEach(character => {
      results.push(Object.assign(new Character(0,0), character.data()));
    })
  })

  return results;
}

export function getCharacter(id: number): Character {
  const db = getFirestore();
  var result;

  getDoc(doc(db, DB.CHARACTER, `${id}`)).then((character) => {
    result = character.data() as Character;
  })

  return Object.assign(new Character(0, 0), result);
}

export function pushCharacter(character: Character): void {
  const db = getFirestore();

  setDoc(doc(db, DB.CHARACTER, `${character.id}`), {
    ...character
  })
}

var testCharacter = getCharacter(18);
console.log(testCharacter.networth);