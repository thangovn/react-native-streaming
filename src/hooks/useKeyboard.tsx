import { useCallback, useEffect, useState } from "react";
import { Keyboard, KeyboardEvent } from "react-native";

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const onKeyboardDidShow = useCallback(
    (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
      setIsShowKeyboard(true);
    },
    [keyboardHeight, isShowKeyboard]
  );

  const onKeyboardDidHide = useCallback(() => {
    setKeyboardHeight(0);
    setIsShowKeyboard(false);
  }, [keyboardHeight, isShowKeyboard]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardDidShow
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardDidHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return { keyboardHeight, isShowKeyboard };
};
