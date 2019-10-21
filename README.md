
# react-native-number-format

## Getting started

`$ npm install react-native-number-format --save`

### Mostly automatic installation

`$ react-native link react-native-number-format`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-number-format` and add `RNNumberFormat.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNNumberFormat.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.yunti.numberFormat.RNNumberFormatPackage;` to the imports at the top of the file
  - Add `new RNNumberFormatPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-number-format'
  	project(':react-native-number-format').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-number-format/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-number-format')
  	```


## Usage
```javascript
import RNNumberFormat from 'react-native-number-format';

// TODO: What to do with the module?
RNNumberFormat;
```
  