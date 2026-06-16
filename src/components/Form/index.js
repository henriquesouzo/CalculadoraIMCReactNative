import React, {useState} from "react";
import { View, TextInput, Text, TouchableOpacity, Vibration, Pressable, Keyboard, FlatList } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(){
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calcular");
    const [errorMessage, setErrorMessage] = useState(null);
    const [imcList, setImcList] = useState([]);

    const [resultado, setResultado] = useState(null);

    function imcCalculator(){
        let heightFormat = height.replace(",", ".");

        let totalImc = ((weight/(heightFormat*heightFormat)).toFixed(2));        
        setImc(totalImc);        

        let resultadoTexto = "";

        //dizer se é bom ou ruim o resultado
        if(totalImc < 18.50){
            resultadoTexto = "Abaixo do peso";
        }
        else if(totalImc >= 18.50 && totalImc <= 24.99){
            resultadoTexto = "Peso bom";
        }
        else if(totalImc >= 25.00 && totalImc <= 29.99){
            resultadoTexto = "Sobrepeso";
        }
        else if(totalImc >= 30.00 ){
            resultadoTexto = "Obesidade";
        }

        setResultado(resultadoTexto);

        //console.log(totalImc);
        //console.log(resultadoTexto);

        setImcList((arr) => [...arr, {id: new Date().getTime(), imc: totalImc, resultado: resultadoTexto }]);

    }

    function verificationImc(){
        if (imc == null){
            setErrorMessage("Campo obrigatório*");
            Vibration.vibrate();
        }
    }

    function validationImc(){
        if(weight != null && height != null){
            imcCalculator();
            setHeight(null);
            setWeight(null);
            setMessageImc("Seu imc é igual:");
            setTextButton("Calcular Novamente");
            setErrorMessage(null);            
        }
        else{
            verificationImc();
            setImc(null);
            setTextButton("Calcular");
            setMessageImc("Preencha o peso e altura");
        }       
        
    }

    return(
        
        <View style={styles.formContext}>
            {imc == null ? 

            <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} onChangeText={setHeight} value={height} placeholder="Ex. 1.75" keyboardType="numeric" />

                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} onChangeText={setWeight} value={weight} placeholder="Ex. 75.365" keyboardType="numeric" />

                <TouchableOpacity style={styles.ButtonCalculator} onPress={() => validationImc()}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </Pressable>       
            :
            <View style={styles.exibitionResultImc}>
                <ResultImc messageResultImc={messageImc} resultImc={imc} resultadoPeso={resultado} />
                
                <TouchableOpacity style={styles.ButtonCalculator} onPress={() => validationImc()}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            }     

            <FlatList showsVerticalScrollIndicator={false} style={styles.listImcs} data={[...imcList].reverse()} renderItem={({item}) =>{
                return(
                    <Text style={styles.resultImcItem}>
                        <Text style={styles.textResultItemList}>Resultado IMC = </Text>      

                        <Text>{item.imc} </Text>

                        {item.imc >= 18.50 && item.imc <= 24.99 ?
                            <Text style={styles.resultadoBom}>{item.resultado}</Text>  
                        :
                            <Text style={styles.resultadoRuim}>{item.resultado}</Text>  
                        }
                        
                    </Text>          
                )
            }}
                keyExtractor={item => item.id }
            />

        </View>
        
    );
}