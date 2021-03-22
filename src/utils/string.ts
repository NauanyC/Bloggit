export function jsUcfirst(string: string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function trimString(string: string, size:number) {
    return string.padEnd(size).substring(0, size) + "...";
  }