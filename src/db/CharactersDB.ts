// Retrieving characters

import { collection, doc, Firestore, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { Character } from "../classes/character/Character";

export enum DB {
  CHARACTER = "character",
  CHARACTER_SCENARIO = "character_scenario",
  SCENARIO = "scenario",
  AGENDA = "agaenda",
  USERS = "users"
}

export function assignCharacter(character): Character {
  return Object.assign(new Character(0,0), character);
}

export function getCharacterByUserID(db: Firestore, userid: string): Character {
  const q = query(collection(db, DB.CHARACTER), where("userid", "==", userid));
  var result;
  // should only return 1
  onSnapshot(q, (characters) => {
    characters.forEach(character => {
      result = character.data() as Character;
    })
  })

  return assignCharacter(result);
}

export function getAllCharacters(db: Firestore): Array<Character> {
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

export function getCharacter(db: Firestore, id: number): Character {
  var result;

  onSnapshot(doc(db, DB.CHARACTER, `${id}`), (character) => {
    result = character.data() as Character;
  })

  return assignCharacter(result);
}

export function pushCharacter(db: Firestore, character: Character): void {
  setDoc(doc(db, DB.CHARACTER, `${character.id}`), {
    ...character
  })
}

export function updateCharacterPage(db: Firestore, characterid: number, page: number): void {
  updateDoc(doc(db, DB.CHARACTER, `${characterid}`), {
    currentpage: page,
  })
}