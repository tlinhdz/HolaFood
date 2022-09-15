import React from "react";
import { useLanguage, useThemeColor, ThemeProps } from "./Themed";
import { Text as DefaultText } from 'react-native';

export function Text(props: TextProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const text = useLanguage(props.text)

    return (
        <DefaultText style={[{ color }, { textAlign: 'center', fontSize: 16, fontWeight: '400' }, style]} {...otherProps} >
            {text}
        </DefaultText>
    );
}

export type TextProps = ThemeProps & DefaultText['props'] & { text: string | undefined };
