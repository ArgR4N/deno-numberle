function mulberry32(a: number) {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

export default function getRandFromDate( date: Date, num_length: number ): string {
    const base = (mulberry32(Number(date.toLocaleDateString().split("/").join("")))*Math.pow(10, num_length)).toString()
    return Array(num_length).fill("0").map((_, i) => base[i] == "." ? "0" : base[i]).join("")  
}
