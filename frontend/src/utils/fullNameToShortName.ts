export function fullNameToShortName(fullName: string): string {
  const fullArray = fullName.split(" ");

  const shortArray = [];
  shortArray.push(fullArray[1]);
  shortArray.push(fullArray[0].toUpperCase());
  return shortArray.join(" ");
}
