import { Injectable } from "@nestjs/common";


export class TokenBlacklistService {

    private readonly blacklist: string[] = [];
    
    addtokentoblacklist(token: string) {
        this.blacklist.push(token);
    }
    verifybanedtoken(token: string): boolean   {
        return this.blacklist.includes(token);
    }
}