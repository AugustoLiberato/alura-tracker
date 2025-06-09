const projeto = {
    id: 1,
    descricaooo: 'Alura Tracker 3.0'
}
//observar, entender, executar ou reagir, quando pede ou define uma propriedade. Usa-se prox (nativa do javaScript)
//target, objeto original | handler é manipulador
const proxy = new Proxy(projeto, {
    get(objetoOriginal, chave, receptor){
        console.log(`Alguém pediu a chave ${chave} do projeto`);
        return Reflect.get(objetoOriginal, chave, receptor);
    },
    //define o novo valor
    set(objetoOriginal, chave, valor) {
        console.log(`Alguém alterou a chave ${chave} do projeto para o valor ${valor}`);
        objetoOriginal[chave] = valor
    }
});
//proxy.descricao = 'Reatividade é mega bacana'
proxy.descricao = 'Reativiade é mega bacana!!!!!'

console.log(proxy.descricaooo)

