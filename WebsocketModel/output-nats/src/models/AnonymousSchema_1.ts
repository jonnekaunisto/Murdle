

class AnonymousSchema_1 {
  private _id?: number;
  private _lumens?: number;
  private _sentAt?: string;
  private _additionalProperties?: Map<String, object | string | number | Array<unknown> | boolean | null>;

  constructor(input: {
    id?: number,
    lumens?: number,
    sentAt?: string,
  }) {
    this._id = input.id;
    this._lumens = input.lumens;
    this._sentAt = input.sentAt;
  }

  get id(): number | undefined { return this._id; }
  set id(id: number | undefined) { this._id = id; }

  get lumens(): number | undefined { return this._lumens; }
  set lumens(lumens: number | undefined) { this._lumens = lumens; }

  get sentAt(): string | undefined { return this._sentAt; }
  set sentAt(sentAt: string | undefined) { this._sentAt = sentAt; }

  get additionalProperties(): Map<String, object | string | number | Array<unknown> | boolean | null> | undefined { return this._additionalProperties; }
  set additionalProperties(additionalProperties: Map<String, object | string | number | Array<unknown> | boolean | null> | undefined) { this._additionalProperties = additionalProperties; }

  public marshal() : string {
    let json = '{'
    if(this.id !== undefined) {
      json += `"id": ${typeof this.id === 'number' || typeof this.id === 'boolean' ? this.id : JSON.stringify(this.id)},`; 
    }
    if(this.lumens !== undefined) {
      json += `"lumens": ${typeof this.lumens === 'number' || typeof this.lumens === 'boolean' ? this.lumens : JSON.stringify(this.lumens)},`; 
    }
    if(this.sentAt !== undefined) {
      json += `"sentAt": ${typeof this.sentAt === 'number' || typeof this.sentAt === 'boolean' ? this.sentAt : JSON.stringify(this.sentAt)},`; 
    }
  
    if(this.additionalProperties !== undefined) { 
      for (const [key, value] of this.additionalProperties.entries()) {
        //Only render additionalProperties which are not already a property
        if(Object.keys(this).includes(String(key))) continue;
        json += `"${key}": ${typeof value === 'number' || typeof value === 'boolean' ? value : JSON.stringify(value)},`;
      }
    }

    //Remove potential last comma 
    return `${json.charAt(json.length-1) === ',' ? json.slice(0, json.length-1) : json}}`;
  }

  public static unmarshal(json: string | object): AnonymousSchema_1 {
    const obj = typeof json === "object" ? json : JSON.parse(json);
    const instance = new AnonymousSchema_1({} as any);

    if (obj["id"] !== undefined) {
      instance.id = obj["id"];
    }
    if (obj["lumens"] !== undefined) {
      instance.lumens = obj["lumens"];
    }
    if (obj["sentAt"] !== undefined) {
      instance.sentAt = obj["sentAt"];
    }

    //Not part of core properties
  
    if (instance.additionalProperties === undefined) {instance.additionalProperties = new Map();}
    for (const [key, value] of Object.entries(obj).filter((([key,]) => {return !["id","lumens","sentAt"].includes(key);}))) {
    
      instance.additionalProperties.set(key, value as any);
    }
    return instance;
  }
}
export default AnonymousSchema_1;
