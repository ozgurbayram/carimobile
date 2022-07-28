import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AxiosResponse } from 'axios';
import React, { useRef, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { AuthStackType } from '../../../types';
import {AnimatedPress,CustomTextInput} from '../../components/';
import { useAuth ,useError } from '../../context';
import { get_token } from '../../services/auth';
import { validateEmail, validatePassword } from '../../utils/validations';

const Login = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<AuthStackType>>();
    // Local States
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    // References
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    // hooks
    const { login } = useAuth();
    const { createError } = useError();
    // Methods
    const _login = async () => {
        setLoading(true);
        if (email && password) {
            // email and password validations
            const isEmailValid = validateEmail(email);
            const isPasswordValid = validatePassword(password);
            if (isEmailValid && isPasswordValid) {
                const response:AxiosResponse = await get_token(
                    email,
                    password
                );
                if (response.status === 400) {
                    setLoading(false);
                    createError(response.data['message']);
                }
                if (response.status == 200) {
                    setLoading(false);
                    login(
                        response.data['access-token'],
                        response.data['email']
                    );
                }
                setLoading(false);
            }
            // error conditions
            if (!isEmailValid) {
                setLoading(false);
                createError('Lütfen geçerli bir E-posta adresi giriniz');
            }
            if (!isPasswordValid) {
                setLoading(false);
                createError('Lütfen geçerli bir şifre giriniz');
            }
        } else {
            setLoading(false);
            emailRef.current?.focus();
        }
    };

    // handle input changes
    const onEmailChange = (text: string) => {
        setEmail(text);
    };
    const onPasswordChange = (text: string) => {
        setPassword(text);
    };
    const navigateToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <CustomTextInput
                ref={emailRef}
                placeholder="E-posta"
                textContentType="emailAddress"
                onChangeText={onEmailChange}
                autoFocus
                onSubmitEditing={() => {
                    passwordRef.current?.focus();
                }}
            />
            <CustomTextInput
                ref={passwordRef}
                placeholder="Şifre"
                textContentType="password"
                secureTextEntry
                onChangeText={onPasswordChange}
            />
            <AnimatedPress
                style={styles.button}
                onPress={_login}
                disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" size="small" />
                ) : (
                    <Text style={styles.buttonText}>Giriş Yap</Text>
                )}
            </AnimatedPress>
            <AnimatedPress
                style={styles.registerBtn}
                disabled={loading}
                onPress={navigateToRegister}>
                <Text style={styles.registerBtnText}>Kayıt Ol</Text>
            </AnimatedPress>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    button: {
        backgroundColor: '#2089db',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
    },
    registerBtn: {
        alignSelf: 'center',
        marginTop: 20,
        padding: 10,
        backgroundColor: '#3d63f4',
        borderRadius: 6,
    },
    registerBtnText: {
        color: '#fff',
    },
});
