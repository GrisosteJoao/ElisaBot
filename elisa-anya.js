const readline = require('readline');
const { exec } = require('child_process');
let input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function userPromise(dot) // Função cria uma promise para possibilitar a digitação assíncrona do usuário, permitindo esperar a digitação antes de continuar.
{
    return new Promise ((result) => {
        input.question(dot, (talk) => {
            let arr = talk.toUpperCase().split(" ");
            result(arr);
        });
    });
}

async function userTalk() // Função usa a Promise anteriormente criada, para passar uma variável, onde é feita lógica de tratamento do usuário.
{
    let speak = [];
    speak = await userPromise("> ");
    
    setTimeout(() => {
        process.stdout.write('\x1b[2J\x1b[0;0H');
        elisaAppear();
        process.stdout.write(`VOCE DIZ: ${speak.join(" ")}\n\n`);
    }, 1);
    
    return speak;
}

function elisaAppear() // Aparencia de Elisa.
{
        const elisa =`
    ⠀⠀⠀⠈⣿⠁⡘⠀⡌⡇⠀⡿⠸⠀⠀⠀⠈⡕⡄⠀⠐⡀⠈⠀⢃⠀⠀⠾⠇⠀⠀⠀⠀
    ⠀⠀⠀⠀⠇⡇⠃⢠⠀⠶⡀⡇⢃⠡⡀⠀⠀⠡⠈⢂⡀⢁⠀⡁⠸⠀⡆⠘⡀⠀⠀⠀⠀
    ⠀⠀⠀⠸⠀⢸⠀⠘⡜⠀⣑⢴⣀⠑⠯⡂⠄⣀⣣⢀⣈⢺⡜⢣⠀⡆⡇⠀⢣⠀⠀⠀⠀
    ⠀⠀⠀⠇⠀⢸⠀⡗⣰⡿⡻⠿⡳⡅⠀⠀⠀⠀⠈⡵⠿⠿⡻⣷⡡⡇⡇⠀⢸⣇⠀⠀⠀
    ⠀⠀⢰⠀⠀⡆⡄⣧⡏⠸⢠⢲⢸⠁⠀⠀⠀⠀⠐⢙⢰⠂⢡⠘⣇⡇⠃⠀⠀⢹⡄⠀⠀
    ⠀⠀⠟⠀⠀⢰⢁⡇⠇⠰⣀⢁⡜⠀⠀⠀⠀⠀⠀⠘⣀⣁⠌⠀⠃⠰⠀⠀⠀⠈⠰⠀⠀
    ⠀⡘⠀⠀⠀⠀⢊⣤⠀⠀⠤⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠤⠄⠀⢸⠃⠀⠀⠀⠀⠀⠃⠀
    ⢠⠁⢀⠀⠀⠀⠈⢿⡀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⢀⠏⠀⠀⠀⠀⠀⠀⠸⠀
    ⠘⠸⠘⡀⠀⠀⠀⠀⢣⠀⠀⠀⠀⠀⠀⠁⠀⠃⠀⠀⠀⠀⢀⠎⠀⠀⠀⠀⠀⢠⠀⠀⡇
    ⠀⠇⢆⢃⠀⠀⠀⠀⠀⡏⢲⢤⢀⡀⠀⠀⠀⠀⠀⢀⣠⠄⡚⠀⠀⠀⠀⠀⠀⣾⠀⠀⠀
    ⢰⠈⢌⢎⢆⠀⠀⠀⠀⠁⣌⠆⡰⡁⠉⠉⠀⠉⠁⡱⡘⡼⠇⠀⠀⠀⠀⢀⢬⠃⢠⠀⡆⠀`;

        console.log(elisa);
}

function elisaTalkingAnim(elisaspeak) // Função que define o código de animação de fala.
{
    let arr = []
    arr = elisaspeak.toUpperCase().split('');
    elisaAppear();
    process.stdout.write("ELISA DIZ: ")
    return new Promise (resolve => {
        for(let i = 0; i < arr.length; i++)
        {
                setTimeout(() => {    
                    exec('powershell -c "[console]::beep(800,50)"');
                    process.stdout.write(`${arr[i]}`);
                }, 120 * i);  
        }

        setTimeout(() => {
            console.log("\n")
            resolve();
        }, 120 * arr.length);
    });

}

async function elisaTalking(userTalk) // Função funciona como um motor de processamento da entrada do usuario, e gera respostas condizentes aleatoriamente. (depende das palavras presentes na frase do usuário)
{
    let match = false;
    let words = await userTalk;
    let response = [];
    let draftresponse = [];
    const rules = [
        { word: "EU", responses: [
            "ME FALE MAIS SOBRE VOCÊ, COMO VOCÊ SE SENTE AQUI?",
            "COMO VOCÊ SE DEFINE? VAMOS EXPLORAR ISSO JUNTOS",
            "O QUE VOCÊ PENSA SOBRE SI MESMO? ISSO TE FAZ FELIZ OU TRISTE?"
        ]},
        { word: "TRISTE", responses: [
            "O QUE TE FAZ SENTIR TRISTE? VOCÊ ESTÁ SOZINHO OU PRECISA DE AJUDA?",
            "QUANDO ESSE SENTIMENTO COMEÇOU? FALOU COM ALGUÉM SOBRE ISSO?",
            "VOCÊ COSTUMA SE SENTIR ASSIM? VAMOS PENSAR SOBRE O QUE PODE AJUDAR"
        ]},
        { word: "FELIZ", responses: [
            "O QUE TE FAZ FELIZ? VAMOS EXPLORAR ESSAS FONTES DE ALEGRIA",
            "ESSE SENTIMENTO É RECENTE? VOCÊ CONSEGUE SE PERMITIR SENTIR FELIZ?",
            "VOCÊ SE PERMITE SENTIR FELIZ? QUEM TE AJUDA A CHEGAR A ISSO?"
        ]},
        { word: "ANSIOSO", responses: [
            "O QUE TE DEIXA ANSIOSO? VOCÊ CONSEGUE RELAXAR OU PRECISA DE AJUDA?",
            "ESSA ANSIEDADE TEM UM MOTIVO? VAMOS PENSAR SOBRE ELE JUNTOS",
            "COMO SEU CORPO REAGE A ISSO? ISSO TE FAZ SENTIR CANSADO OU COM MEDO?"
        ]},
        { word: "SOZINHO", responses: [
            "VOCÊ SE SENTE SOZINHO COM FREQUÊNCIA? VAMOS FALAR SOBRE AMIGOS OU FAMÍLIA",
            "O QUE SIGNIFICA ESTAR SOZINHO PARA VOCÊ? ISSO TE FAZ TRISTE OU ANSIOSO?",
            "QUANDO FOI A ÚLTIMA VEZ QUE SE SENTIU ASSIM? VAMOS REFLETIR SOBRE ISSO"
        ]},
        { word: "CANSADO", responses: [
            "O QUE TE DEIXA CANSADO? ISSO É FÍSICO OU EMOCIONAL?",
            "ESSE CANSAÇO É FÍSICO OU EMOCIONAL? VOCÊ CONSEGUE DESCANSAR?",
            "VOCÊ CONSEGUE DESCANSAR? VAMOS PENSAR EM AJUDA OU SOLUÇÕES"
        ]},
        { word: "MEDO", responses: [
            "O QUE TE ASSUSTA? VOCÊ CONSEGUE FALAR SOBRE ISSO?",
            "ESSE MEDO É CONSTANTE? COMO VOCÊ REAGE QUANDO ELE SURGE?",
            "COMO VOCÊ REAGE AO MEDO? VAMOS PENSAR JUNTOS EM SOLUÇÕES"
        ]},
        { word: "RAIVA", responses: [
            "O QUE TE CAUSA RAIVA? VOCÊ CONVERSOU SOBRE ISSO COM ALGUÉM?",
            "VOCÊ COSTUMA EXPRESSAR SUA RAIVA? ISSO AJUDA OU PREJUDICA?",
            "ESSA RAIVA É DIRECIONADA A ALGUÉM? VAMOS REFLETIR SOBRE O FUTURO"
        ]},
        { word: "ESTOU", responses: [
            "POR QUE VOCÊ ESTÁ ASSIM? ISSO TE FAZ SENTIR CANSADO OU COM RAIVA?",
            "COMO VOCÊ CHEGOU A ESSE ESTADO? VAMOS REFLETIR SOBRE ISSO",
            "O QUE ISSO SIGNIFICA PARA VOCÊ? VOCÊ PENSA NO FUTURO OU PASSADO?"
        ]},
        { word: "AMIGO", responses: [
            "VOCÊ CONFIA NOS SEUS AMIGOS? ISSO TE AJUDA OU PREJUDICA?",
            "COMO SÃO SUAS AMIZADES? VOCÊ SE SENTE APOIADO?",
            "UM AMIGO TE AJUDOU RECENTEMENTE? ISSO TE FAZ FELIZ OU TRISTE?"
        ]},
        { word: "FAMILIA", responses: [
            "COMO É SUA RELAÇÃO COM A FAMÍLIA? TEM CONFLITOS OU APOIO?",
            "SUA FAMÍLIA TE APOIA? ISSO TE AJUDA OU TE PREOCUPA?",
            "HÁ CONFLITOS FAMILIARES? VOCÊ CONSEGUE RESOLVER OU DISCUTIR?"
        ]},
        { word: "TRABALHO", responses: [
            "SEU TRABALHO TE SATISFAZ? VOCÊ SE SENTE PRESSÃO OU MOTIVADO?",
            "O QUE MAIS TE INCOMODA NO TRABALHO? ISSO TE FAZ SENTIR RAIVA OU MEDO?",
            "VOCÊ SE SENTE VALORIZADO? VAMOS PENSAR EM MUDANÇAS OU AJUDA"
        ]},
        { word: "ESTUDO", responses: [
            "O QUE VOCÊ ESTÁ ESTUDANDO? VOCÊ SE SENTE MOTIVADO OU ANSIOSO?",
            "ESSE ESTUDO TEM UM OBJETIVO? VAMOS PENSAR SOBRE O FUTURO",
            "VOCÊ SE SENTE MOTIVADO A APRENDER? ISSO TE FAZ FELIZ OU TRISTE?"
        ]},
        { word: "PRESSAO", responses: [
            "QUEM TE PRESSIONA? VOCÊ CONSEGUE CONVERSAR SOBRE ISSO?",
            "ESSA PRESSÃO É INTERNA OU EXTERNA? VAMOS PENSAR EM SOLUÇÕES",
            "COMO VOCÊ LIDA COM ISSO? ISSO TE FAZ SENTIR RAIVA OU ANSIEDADE?"
        ]},
        { word: "FUTURO", responses: [
            "O QUE VOCÊ ESPERA DO FUTURO? VOCÊ SE SENTE ANSIOSO OU MOTIVADO?",
            "O FUTURO TE PREOCUPA? VAMOS REFLETIR SOBRE PLANOS",
            "VOCÊ FAZ PLANOS? ISSO TE FAZ FELIZ OU TRISTE?"
        ]},
        { word: "PASSADO", responses: [
            "SEU PASSADO TE INFLUENCIA? VOCÊ SE SENTE CULPADO OU APRENDENDO?",
            "HÁ ALGO DO PASSADO QUE TE MARCOU? ISSO TE FAZ SENTIR RAIVA OU FELICIDADE?",
            "VOCÊ PENSA MUITO NO PASSADO? VAMOS PENSAR SOBRE O FUTURO"
        ]},
        { word: "SONHO", responses: [
            "QUAL É SEU SONHO? VOCÊ PENSA EM CONQUISTAR OU MUDAR?",
            "VOCÊ ACREDITA QUE PODE REALIZÁ-LO? VAMOS PENSAR SOBRE OBJETIVOS",
            "O QUE TE IMPEDE? ISSO TE CAUSA MEDO OU ANSIEDADE?"
        ]},
        { word: "OBJETIVO", responses: [
            "QUAL É SEU OBJETIVO? VAMOS PENSAR EM PASSOS PRÁTICOS",
            "ESSE OBJETIVO É IMPORTANTE? VOCÊ SE SENTE MOTIVADO OU PRESSÃO?",
            "VOCÊ ESTÁ PRÓXIMO DE ALCANÇÁ-LO? ISSO TE FAZ FELIZ OU TRISTE?"
        ]},
        { word: "MOTIVADO", responses: [
            "O QUE TE MOTIVA? VOCÊ SE SENTE FELIZ OU ANSIOSO?",
            "ESSA MOTIVAÇÃO MUDA COM O TEMPO? VAMOS PENSAR SOBRE OBJETIVOS",
            "VOCÊ SE SENTE DESMOTIVADO? O QUE AJUDARIA A MUDAR ISSO?"
        ]},
        { word: "CONFIANCA", responses: [
            "VOCÊ CONFIA EM SI MESMO? ISSO TE AJUDA OU PREJUDICA?",
            "O QUE TE FAZ PERDER CONFIANÇA? VAMOS REFLETIR SOBRE MUDANÇAS",
            "ALGUÉM QUEBROU SUA CONFIANÇA? VOCÊ CONSEGUE PERDOAR?"
        ]},
        { word: "ERRO", responses: [
            "VOCÊ SE CULPA POR ESSE ERRO? ISSO TE FAZ SENTIR CULPA OU ANSIEDADE?",
            "O QUE APRENDEU COM ISSO? VAMOS REFLETIR SOBRE MUDANÇAS",
            "ESSE ERRO AINDA TE AFETA? VOCÊ CONSEGUE SE PERDOAR?"
        ]},
        { word: "CULPA", responses: [
            "POR QUE VOCÊ SE SENTE CULPADO? ISSO TE IMPACTA NO PRESENTE?",
            "ESSA CULPA É JUSTA? VAMOS EXPLORAR ISSO JUNTOS",
            "VOCÊ CONSEGUE SE PERDOAR? ISSO TE FAZ FELIZ OU TRISTE?"
        ]},
        { word: "DECISAO", responses: [
            "ESSA DECISÃO FOI DIFÍCIL? VOCÊ SE ARREPENDE OU ESTÁ SEGURO?",
            "VOCÊ ESTÁ SEGURO DO QUE DECIDIU? VAMOS REFLETIR SOBRE CONSEQUÊNCIAS",
            "QUAIS FORAM AS OPÇÕES? ISSO TE DEIXOU ANSIOSO OU ALIVIADO?"
        ]},
        { word: "DIFICIL", responses: [
            "POR QUE ISSO É DIFÍCIL? VOCÊ JÁ PASSOU POR ISSO ANTES?",
            "VOCÊ JÁ SUPEROU ALGO PARECIDO? ISSO TE AJUDA A SE SENTIR CONFIANTE",
            "O QUE TE IMPEDE DE AVANÇAR? VAMOS PENSAR SOBRE SOLUÇÕES"
        ]},
        { word: "MUDANCA", responses: [
            "VOCÊ TEM MEDO DE MUDAR? ISSO TE FAZ SENTIR ANSIEDADE OU RAIVA?",
            "ESSA MUDANÇA É NECESSÁRIA? VAMOS REFLETIR SOBRE BENEFÍCIOS",
            "O QUE VOCÊ GANHARIA COM ISSO? VOCÊ SE SENTE FELIZ OU INCERTO?"
        ]},
        { word: "ESCOLHA", responses: [
            "ESSA ESCOLHA FOI SUA? VOCÊ SE ARREPENDE OU ESTÁ SEGURO?",
            "VOCÊ SE ARREPENDE? VAMOS REFLETIR SOBRE CONSEQUÊNCIAS",
            "HAVIA ALTERNATIVAS? ISSO TE DEIXA FELIZ OU TRISTE?"
        ]},
        { word: "TEMPO", responses: [
            "O TEMPO TE PREOCUPA? VOCÊ SE SENTE PRESSÃO OU CALMO?",
            "VOCÊ SENTE QUE O TEMPO PASSA RÁPIDO? VAMOS REFLETIR SOBRE PRIORIDADES",
            "COMO VOCÊ USA SEU TEMPO? ISSO TE FAZ FELIZ OU ANSIOSO?"
        ]},
        { word: "VIDA", responses: [
            "O QUE A VIDA SIGNIFICA PARA VOCÊ? VOCÊ SE SENTE SATISFEITO OU ANSIOSO?",
            "VOCÊ ESTÁ SATISFEITO COM SUA VIDA? VAMOS PENSAR EM MUDANÇAS",
            "O QUE GOSTARIA DE MUDAR? ISSO TE FAZ FELIZ OU TRISTE?"
        ]},
        { word: "MUNDO", responses: [
            "COMO VOCÊ VÊ O MUNDO? ISSO TE FAZ FELIZ OU TRISTE?",
            "O MUNDO TE ASSUSTA? VOCÊ TEM MEDO OU ANSIEDADE?",
            "VOCÊ SE SENTE PARTE DELE? VAMOS PENSAR SOBRE CONEXÕES"
        ]},
        { word: "ESPERANCA", responses: [
            "VOCÊ AINDA TEM ESPERANÇA? ISSO TE FAZ FELIZ OU ANSIOSO?",
            "O QUE TE DÁ ESPERANÇA? VAMOS PENSAR SOBRE COMO MANTER ISSO",
            "ESSA ESPERANÇA É FORTE? VOCÊ SE SENTE MOTIVADO OU DESMOTIVADO?"
        ]},
        { word: "AJUDA", responses: [
            "VOCÊ PRECISA DE AJUDA? VAMOS PENSAR SOBRE SOLUÇÕES",
            "COMO POSSO AJUDAR VOCÊ? ISSO TE FAZ SENTIR FELIZ OU TRISTE?",
            "QUE TIPO DE AJUDA VOCÊ PROCURA? VOCÊ PENSA NO FUTURO OU PASSADO?"
        ]},
        { word: "OBRIGADO", responses: [
            "IMAGINA, EU ESTOU AQUI PARA AJUDAR, VAMOS CONTINUAR FALANDO DE VOCÊ",
            "É SEMPRE BOM TE AJUDAR, VAMOS FALAR DE VOCÊ",
            "FICO FELIZ EM AJUDAR, MAS CONTINUE, VAMOS FALAR SOBRE VOCÊ"
        ]},
        { word: "AQUI", responses: [
            "ESTOU AQUI PARA ESCUTAR VOCÊ, VAMOS FALAR SOBRE SENTIMENTOS",
            "O QUE FAZ VOCÊ SE SENTIR AQUI? ISSO TE DEIXA FELIZ OU TRISTE?",
            "COMO É ESTAR AQUI AGORA? VOCÊ PENSA EM AMIGOS OU FAMÍLIA?"
        ]},
        { word: "VAMOS", responses: [
            "VAMOS FALAR MAIS SOBRE VOCÊ, O QUE VOCÊ PENSA SOBRE SI?",
            "VAMOS EXPLORAR ESSE SENTIMENTO, VOCÊ SE SENTE FELIZ OU TRISTE?",
            "VAMOS PENSAR SOBRE ISSO JUNTOS, ISSO TE AJUDA OU PREJUDICA?"
        ]},
        { word: "FALOU", responses: [
            "O QUE VOCÊ FALOU É IMPORTANTE, VAMOS PENSAR SOBRE ISSO",
            "PODE EXPLICAR MELHOR O QUE FALOU? ISSO TE FAZ SENTIR FELIZ OU TRISTE?",
            "ESSA PALAVRA QUE FALOU TEM SIGNIFICADO? VAMOS REFLETIR JUNTOS"
        ]}
    ];
    
    for (let i = 0; i < words.length; i++)
    {
        switch(words[i])
        {
            case "EU":        response.push(rules[0].responses[Math.floor(Math.random()*rules[0].responses.length)]); match = true; break;
            case "TRISTE":    response.push(rules[1].responses[Math.floor(Math.random()*rules[1].responses.length)]); match = true; break;
            case "FELIZ":     response.push(rules[2].responses[Math.floor(Math.random()*rules[2].responses.length)]); match = true; break;
            case "ANSIOSO":   response.push(rules[3].responses[Math.floor(Math.random()*rules[3].responses.length)]); match = true; break;
            case "SOZINHO":   response.push(rules[4].responses[Math.floor(Math.random()*rules[4].responses.length)]); match = true; break;
            case "CANSADO":   response.push(rules[5].responses[Math.floor(Math.random()*rules[5].responses.length)]); match = true; break;
            case "MEDO":      response.push(rules[6].responses[Math.floor(Math.random()*rules[6].responses.length)]); match = true; break;
            case "RAIVA":     response.push(rules[7].responses[Math.floor(Math.random()*rules[7].responses.length)]); match = true; break;
            case "ESTOU":     response.push(rules[8].responses[Math.floor(Math.random()*rules[8].responses.length)]); match = true; break;
            case "AMIGO":     response.push(rules[9].responses[Math.floor(Math.random()*rules[9].responses.length)]); match = true; break;
            case "FAMILIA":   response.push(rules[10].responses[Math.floor(Math.random()*rules[10].responses.length)]); match = true; break;
            case "TRABALHO":  response.push(rules[11].responses[Math.floor(Math.random()*rules[11].responses.length)]); match = true; break;
            case "ESTUDO":    response.push(rules[12].responses[Math.floor(Math.random()*rules[12].responses.length)]); match = true; break;
            case "PRESSAO":   response.push(rules[13].responses[Math.floor(Math.random()*rules[13].responses.length)]); match = true; break;
            case "FUTURO":    response.push(rules[14].responses[Math.floor(Math.random()*rules[14].responses.length)]); match = true; break;
            case "PASSADO":   response.push(rules[15].responses[Math.floor(Math.random()*rules[15].responses.length)]); match = true; break;
            case "SONHO":     response.push(rules[16].responses[Math.floor(Math.random()*rules[16].responses.length)]); match = true; break;
            case "OBJETIVO":  response.push(rules[17].responses[Math.floor(Math.random()*rules[17].responses.length)]); match = true; break;
            case "MOTIVADO": response.push(rules[18].responses[Math.floor(Math.random()*rules[18].responses.length)]); match = true; break;
            case "CONFIANCA": response.push(rules[19].responses[Math.floor(Math.random()*rules[19].responses.length)]); match = true; break;
            case "ERRO":      response.push(rules[20].responses[Math.floor(Math.random()*rules[20].responses.length)]); match = true; break;
            case "CULPA":     response.push(rules[21].responses[Math.floor(Math.random()*rules[21].responses.length)]); match = true; break;
            case "DECISAO":   response.push(rules[22].responses[Math.floor(Math.random()*rules[22].responses.length)]); match = true; break;
            case "DIFICIL":   response.push(rules[23].responses[Math.floor(Math.random()*rules[23].responses.length)]); match = true; break;
            case "MUDANCA":   response.push(rules[24].responses[Math.floor(Math.random()*rules[24].responses.length)]); match = true; break;
            case "ESCOLHA":   response.push(rules[25].responses[Math.floor(Math.random()*rules[25].responses.length)]); match = true; break;
            case "TEMPO":     response.push(rules[26].responses[Math.floor(Math.random()*rules[26].responses.length)]); match = true; break;
            case "VIDA":      response.push(rules[27].responses[Math.floor(Math.random()*rules[27].responses.length)]); match = true; break;
            case "MUNDO":     response.push(rules[28].responses[Math.floor(Math.random()*rules[28].responses.length)]); match = true; break;
            case "ESPERANCA": response.push(rules[29].responses[Math.floor(Math.random()*rules[29].responses.length)]); match = true; break;
            case "AJUDA":     response.push(rules[30].responses[Math.floor(Math.random()*rules[30].responses.length)]); match = true; break;
            case "OBRIGADO":  response.push(rules[31].responses[Math.floor(Math.random()*rules[31].responses.length)]); match = true; break;
            case "AQUI":      response.push(rules[32].responses[Math.floor(Math.random()*rules[32].responses.length)]); match = true; break;
            case "VAMOS":     response.push(rules[33].responses[Math.floor(Math.random()*rules[33].responses.length)]); match = true; break;
            case "FALOU":     response.push(rules[34].responses[Math.floor(Math.random()*rules[34].responses.length)]); match = true; break;
        }
    }

        if(match)
        {
            return response[Math.floor(Math.random() * response.length)];
        } else
        {
            return "ME DESCULPE, EU NAO ENTENDI, PODE SER MAIS ESPECIFICO?";
        }
}


async function main () // Controla fluxo principal, coloca primeira frase de Elisa, e então entra em um loop de conversa infinito.
{
    await elisaTalkingAnim("COMO VOCE ESTA SE SENTINDO HOJE? TRISTE? TALVEZ FELIZ?");
    while (true)
    {
        let elisaresponse = await elisaTalking(userTalk());  
        await elisaTalkingAnim(elisaresponse);
    }

}

main();
