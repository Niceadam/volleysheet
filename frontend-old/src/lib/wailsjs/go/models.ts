export namespace backend {
	
	export class Player {
	    num: number;
	    name: string;
	    libero: boolean;
	    captain: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Player(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.num = source["num"];
	        this.name = source["name"];
	        this.libero = source["libero"];
	        this.captain = source["captain"];
	    }
	}
	export class Team {
	    name: string;
	    players: {[key: number]: Player};
	
	    static createFrom(source: any = {}) {
	        return new Team(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.players = this.convertValues(source["players"], Player, true);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class TeamState {
	    // Go type: Team
	    team?: any;
	    score: number;
	    setsWon: number;
	    timeOuts: number;
	    subCount: number;
	    rotation: number[];
	    liberoSub: number;
	    normSub: {[key: number]: number};
	
	    static createFrom(source: any = {}) {
	        return new TeamState(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.team = this.convertValues(source["team"], null);
	        this.score = source["score"];
	        this.setsWon = source["setsWon"];
	        this.timeOuts = source["timeOuts"];
	        this.subCount = source["subCount"];
	        this.rotation = source["rotation"];
	        this.liberoSub = source["liberoSub"];
	        this.normSub = source["normSub"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Match {
	    teamState: TeamState[];
	    serveSide: number;
	
	    static createFrom(source: any = {}) {
	        return new Match(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.teamState = this.convertValues(source["teamState"], TeamState);
	        this.serveSide = source["serveSide"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace main {
	
	export class SubReturn {
	    liberoSub: boolean;
	    err: string;
	
	    static createFrom(source: any = {}) {
	        return new SubReturn(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.liberoSub = source["liberoSub"];
	        this.err = source["err"];
	    }
	}

}

