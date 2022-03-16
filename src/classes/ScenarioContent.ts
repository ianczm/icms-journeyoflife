import { doc, Firestore, getDoc, setDoc } from "firebase/firestore";

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

    async retrieveFromDatabase(db: Firestore, pageid: number) {
        const docRef = doc(db, 'scenario', `${pageid}`)
        await getDoc(docRef).then((snapshot) => {
            const data = snapshot.data();
            this.pageid = data.id;
            this.heading = data.heading;
            this.phase = data.phase;
            this.title = data.title;
            this.body = data.body;
            this.options = data.options;
        });
    }
}

async function retrieveScenarioFromDatabase(db: Firestore, pageid: number): Promise<ScenarioContent> {
    const docRef = doc(db, 'scenario', `${pageid}`)
    const snapshot = await getDoc(docRef);
    return snapshot.data() as ScenarioContent;
}

export { ScenarioContent, Options, retrieveScenarioFromDatabase }