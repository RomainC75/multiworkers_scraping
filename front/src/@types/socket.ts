export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    scrapingInfo:(data: scrapingInfoData)=>void
  }

export interface ClientToServerEvents {
    hello: () => void;
  }
  
export interface InterServerEvents {
    ping: () => void;
  }

export interface scrapingInfoData {
    fullCount?:number, 
    halfCount?:number,
    date:Date
}