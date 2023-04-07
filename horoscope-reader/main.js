function findZodiac() {
  const birthDate = document.getElementById("birthDate").value;
  const birthMonth = parseInt(birthDate.substring(0,2));
  const birthDay = parseInt(birthDate.substring(3,5));
  const birthYear = parseInt(birthDate.substring(6));
  const zodiacSigns = [
    {
      name: "Aquarius",
      startDate: "01/20",
      endDate: "02/18",
      description: "Aquarians are independent, original, and visionary."
    },
    {
      name: "Pisces",
      startDate: "02/19",
      endDate: "03/20",
      description: "Pisces are imaginative, compassionate, and sensitive."
    },
    {
      name: "Aries",
      startDate: "03/21",
      endDate: "04/19",
      description: "Aries are energetic, adventurous, and confident."
    },
    {
      name: "Taurus",
      startDate: "04/20",
      endDate: "05/20",
      description: "Tauruses are reliable, patient, and practical."
    },
    {
      name: "Gemini",
      startDate: "05/21",
      endDate: "06/20",
      description: "Geminis are curious, adaptable, and sociable."
    },
    {
      name: "Cancer",
      startDate: "06/21",
      endDate: "07/22",
      description: "Cancers are nurturing, empathetic, and intuitive."
    },
    {
      name: "Leo",
      startDate: "07/23",
  endDate: "08/22",
  description: "Leos are confident, generous, and passionate."
},
{
  name: "Virgo",
  startDate: "08/23",
  endDate: "09/22",
  description: "Virgos are analytical, reliable, and practical."
},
{
  name: "Libra",
  startDate: "09/23",
  endDate: "10/22",
  description: "Libras are diplomatic, social, and artistic."
},
{
  name: "Scorpio",
  startDate: "10/23",
  endDate: "11/21",
  description: "Scorpios are passionate, mysterious, and intense."
},
{
  name: "Sagittarius",
  startDate: "11/22",
  endDate: "12/21",
  description: "Sagittariuses are adventurous, optimistic, and philosophical."
},
{
  name: "Capricorn",
  startDate: "12/22",
  endDate: "01/19",
  description: "Capricorns are responsible, disciplined, and ambitious."
}
];
let zodiacSign = "";
for (let i = 0; i < zodiacSigns.length; i++) {
const startDate = zodiacSigns[i].startDate;
const endDate = zodiacSigns[i].endDate;
const startMonth = parseInt(startDate.substring(0,2));
const startDay = parseInt(startDate.substring(3,5));
const endMonth = parseInt(endDate.substring(0,2));
const endDay = parseInt(endDate.substring(3,5));
if ((birthMonth === startMonth && birthDay >= startDay) || (birthMonth === endMonth && birthDay <= endDay)) {
  zodiacSign = zodiacSigns[i].name;
  document.getElementById("description").innerHTML = zodiacSigns[i].description;
  break;
}
}
document.getElementById("zodiac").innerHTML = zodiacSign;
}