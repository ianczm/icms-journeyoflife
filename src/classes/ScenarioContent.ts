import { doc, Firestore, setDoc } from "firebase/firestore";

class Options {

    optionid: number;
    desc: string;
    outcome: string;

    constructor(optionid: number, desc: string, outcome: string) {
        this.desc = desc;
        this.optionid = optionid;
        this.outcome = outcome;
    }
}

class ScenarioContent {

    pageid: number;

    heading: string; // Phase 1
    phase: string; // Phase 1A
    title: string; // Managing Your Home

    body: string;
    options: Array<Options>;

    constructor(
        pageid: number,
        heading: string,
        phase: string,
        title: string,
        body: string,
        options: Array<Options>
    ) {
        this.pageid = pageid;
        this.heading = heading;
        this.phase = phase;
        this.title = title;
        this.body = body;
        this.options = options;
    }

    updateDatabase(db: Firestore) {
        const docRef = doc(db, 'scenario', `${this.pageid}`)
        setDoc(docRef, {
            ...JSON.parse(JSON.stringify(this))
        });
    }
}

export { ScenarioContent, Options }