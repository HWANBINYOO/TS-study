import * as CryptoJS from "crypto-js";
class Block {
    //블록을 생성하지 않아도 되는 mathod
    static calculateBlockHash = (
        index: number,previousHash: string,timestamp: number,data: string
        ) : string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    //블록의 구조가 유효한지 아닌지를 판단한다.
    static validateStructure = (aBlock: Block) : boolean => 
        typeof aBlock.index === "number" && 
        typeof aBlock.hash === "string" && 
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";

    public hash: string;
    public previousHash:string;
    public index:number;
    public data:string;
    public timestamp:number;

    constructor(
        index:number,
        hash: string,
        previousHash:string,
        data:string,
        timestamp:number
        ){
            this.index = index;
            this.hash = hash;
            this.previousHash = previousHash;
            this.data = data;
            this.timestamp = timestamp;     
        }
}

const genesisBlock:Block = new Block(0, "20202020" , "" ,"Hello", 123456);

let blockchain:Block[] = [genesisBlock];

console.log(blockchain);

const getBlockchain = () : Block[] => blockchain;

const getLatestBlock = () : Block => blockchain[blockchain.length -1];

const getNewTimeStamp = () :number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data:string) : Block => {
    const previousBlock : Block = getLatestBlock();
    const newIndex : number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimeStamp();
    const newHash : string = Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        newTimestamp,   
        data
    );
    const newBlock : Block = new Block(
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        newTimestamp
    );
    addBlock(newBlock);
    return newBlock;
};

const getHashforBlock = (aBlock :Block):string =>
    Block.calculateBlockHash(
        aBlock.index,
        aBlock.previousHash,
        aBlock.timestamp,
        aBlock.data
    );

const isBlockValid = (
    candidateBlock: Block,
    previousBlock: Block
    ) : boolean => {
        if(!Block.validateStructure(candidateBlock)){
            return false;
        } else if(previousBlock.index + 1 !== candidateBlock.index){
            return false;
        } else if(previousBlock.hash !== candidateBlock.previousHash){
            return false;
        } else if(getHashforBlock(candidateBlock) !== candidateBlock.hash){
            return false;
        } else{
            true;
        }
    };

const addBlock = (candidateBlock:Block) : void => {
    if(isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};

createNewBlock("secend Block");
createNewBlock("third Block");
createNewBlock("fourth Block");

console.log(blockchain);


export{};