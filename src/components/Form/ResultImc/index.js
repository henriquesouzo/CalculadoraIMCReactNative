import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import styles from "./style";

export default function ResultImc(props){
    const onShare = async () => {
        const result = await Share.share({
            message: "Meu IMC hoje é: " + props.resultImc + " " + props.resultadoPeso
        })
    }    

    return(
        <View style={styles.resultImc}>
            <View style={styles.boxSharebutton}>
                <Text style={styles.information}>{props.messageResultImc}</Text>
                <Text style={styles.numberImc}>{props.resultImc}</Text>  

                {props.resultImc >= 18.50 && props.resultImc <= 24.99 ?
                    <Text style={styles.resultadoBom}>{props.resultadoPeso}</Text>  
                :
                    <Text style={styles.resultadoRuim}>{props.resultadoPeso}</Text>  
                }

                <TouchableOpacity
                    onPress={onShare}
                    style={styles.shared}>
                    <Text style={styles.sharedText}>Share</Text>
                </TouchableOpacity>
            </View>
                      
        </View>
    );
}