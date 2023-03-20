//---задание-1----//

const parser = new DOMParser();

const xmlString = `<list>
	<student>
	 <name lang="en"><first>Ivan</first> <second>Ivanov</second></name>
      <age>35</age>
      <prof>teacher</prof>
    </student>

    <student>
      <name lang="ru"><first>Петр</first> <second>Петров</second></name>
      <age>58</age>
      <prof>водитель</prof>
    </student>
  </list>`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const nameNodeEn = xmlDOM.getElementsByTagName("name")[0];
const ageNodeEn = xmlDOM.getElementsByTagName("age")[0];
const profNodeEn = xmlDOM.getElementsByTagName("prof")[0];
const langAttrEn = nameNodeEn.getAttribute("lang");

const nameNodeRu = xmlDOM.getElementsByTagName("name")[1];
const ageNodeRu = xmlDOM.getElementsByTagName("age")[1];
const profNodeRu = xmlDOM.getElementsByTagName("prof")[1];
const langAttrRu = nameNodeRu.getAttribute("lang");

const result = {
  List: [
      {name: nameNodeEn.textContent, age: Number(ageNodeEn.textContent), prof: profNodeEn.textContent, lang: langAttrEn,},
      {name: nameNodeRu.textContent, age: Number(ageNodeRu.textContent), prof: profNodeRu.textContent, lang: langAttrRu,}
  ],
}
console.log(result);


//---задание-2----//

const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}`;

const data = JSON.parse(jsonString);

const list = data.list;

const result = {
	list: [
		{name: list[0].name, age: Number(list[0].age), prof: list[0].prof},
		{name: list[1].name, age: Number(list[1].age), prof: list[1].prof}
	]
}

console.log(result)