import * as React from "react";
import {
  StyleSheet,
  Animated,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
  StyleProp,
  TextStyle,
  ImageStyle,
  Image,
  ImagePropsIOS,
  ImagePropsAndroid,
  AccessibilityProps,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  ImageErrorEventData,
  ImageLoadEventData,
  ImageResizeMode,
  ImageSourcePropType,
  ImageURISource,
  ImageProps,
} from "react-native";
const defaultImg = require("../../assets/images/common/button.png");
const activityImg = require("../../assets/images/common/button-active.png");

interface IWithoutFeedbackProps extends TouchableWithoutFeedbackProps { }
interface ImagePropsBase extends ImagePropsIOS, ImagePropsAndroid, AccessibilityProps {
  onLayout?: (event: LayoutChangeEvent) => void;
  onError?: (error: NativeSyntheticEvent<ImageErrorEventData>) => void;
  onLoad?: (event: NativeSyntheticEvent<ImageLoadEventData>) => void;
  onLoadEnd?: () => void;
  onLoadStart?: () => void;
  progressiveRenderingEnabled?: boolean;
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  resizeMode?: ImageResizeMode;
  resizeMethod?: "auto" | "resize" | "scale";
  source?: ImageSourcePropType;
  loadingIndicatorSource?: ImageURISource;
  testID?: string;
  defaultSource?: ImageURISource | number;
}
interface ImageBackgroundProps extends ImagePropsBase {
  imageStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  imageRef?(image: Image): void;
}
interface IImageProps extends ImageBackgroundProps { }

interface ITcButtonProps {
  // 支持的入参
  argsTouchable?: IWithoutFeedbackProps;
  argsImage?: IImageProps;
  onPress: Function;
  text?: String;
  buttonStyle?: StyleProp<ViewStyle>;
  extra?: any; // 新增扩展属性，button中的内容自定义
  textStyle?: StyleProp<TextStyle>;
  activity?: Boolean;
  argsIcon?: ImageProps;
  numberOfLines?: number;
}

class TcButton extends React.Component<ITcButtonProps, {}> {
  state = {
    springValue: new Animated.Value(1),
  };
  static defaultProps = {
    numberOfLines: 1,
    argsImage: {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: 0,
        flex: 1,
      },
    },
  };
  springAnimated = Animated.spring(this.state.springValue, {
    toValue: 1,
    friction: 7, //弹跳系数
  });
  _startAnimated() {
    this.state.springValue.setValue(0.85);
    this.springAnimated.start();
    this.onWithoutFeedbackPress();
  }
  onWithoutFeedbackPress = () => {
    this.props.onPress();
  };
  render() {
    const { argsTouchable, argsImage, text, buttonStyle, extra, textStyle, activity, argsIcon, numberOfLines } = this.props;
    // @ts-ignore
    const resizeMode = argsImage && argsImage.resizeMode ? argsImage.resizeMode : "stretch"
    return (
      <TouchableWithoutFeedback
        {...argsTouchable}
        // onPress={() => {
        //   this.onWithoutFeedbackPress();
        // }}
        style={{ flex: 1 }}
        onPress={this._startAnimated.bind(this)}
      >
        <Animated.View
          style={[
            {
              transform: [{ scale: this.state.springValue }],
            },
            buttonStyle,
          ]}
        >
          {argsImage && (
            <ImageBackground
              resizeMode={resizeMode}
              source={activity ? activityImg : defaultImg}
              {...argsImage}
            >
              {text && (
                <View style={styles.content_view}>
                  {argsIcon ? (
                    <Image
                      style={{
                        width: 17,
                        height: 18,
                        marginTop: 3,
                        resizeMode: "stretch",
                      }}
                      {...argsIcon}
                    />
                  ) : null}
                  <Text
                    style={
                      textStyle
                        ? textStyle
                        : !argsImage.source && !textStyle
                          ? { color: "#a76306" }
                          : {
                            color: "#fff",
                            paddingTop: 5,
                            paddingBottom: 5,
                            paddingLeft: 10,
                            paddingRight: 10,
                          }
                    }
                    numberOfLines={numberOfLines}
                  >
                    {text}
                  </Text>
                </View>
              )}
              {extra && { ...extra }}
            </ImageBackground>
          )}
          {!argsImage && text && <Text style={textStyle ? textStyle : { color: "#fff" }}>{text}</Text>}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default TcButton;
const styles = StyleSheet.create({
  default_view: {
    display: "flex",
  },
  default_image: {
    display: "flex",
    justifyContent: "center",
  },
  content_view: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
