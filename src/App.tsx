import {
  UseStatePractice,
  UseEffectPractice,
  UseLayoutEffectPractice,
  UseRefPractice,
  UseReducerPractice,
  UseCallbackPractice,
  UseMemoPractice,
  UseContextPractice,
  NormalComponent,
  UseTransitionPractice,
  UseDeferredValuePractice,
  UseImperativeHandlePractice,
  UseDebugValuePractice,
  JustPractice,
  JustPracticeTwo,
  JustPracticeThree,
  JustPracticeFour,
  NormalComponentTwo,
} from './built-in-hooks';

import {
  ToggleComponent,
  TimeoutComponent,
  DebounceComponent,
  UpdateEffectComponent,
  ArrayComponent,
  PreviousComponent,
  StateHistoryComponent,
  StorageComponent,
  AsyncComponent,
  FetchComponent,
  DeepCompareEffectComponent,
  EventListenerComponent,
  OnScreenComponent,
  WindowSizeComponent,
  MediaQueryComponent,
  GeolocationComponent,
  StateWithValidationComponent,
  SizeComponent,
  EffectOnceComponent,
  ClickOutsideComponent,
  DarkModeComponent,
  CopyToClipboardComponent,
  CookieComponent,
  OnlineStatusComponent,
  RenderCountComponent,
  DebugInfoComponent,
  HoverComponent,
  LongPressComponent,
} from './custom-hooks';
import PracticeSession from './practice/PracticeSession';

import './style.css';

const styleTheme = {
  border: '2px solid green',
  margin: '2rem',
  padding: '1rem',
};

const App = () => {
  return (
    <main className="main-content">
      <section className="built-in-hooks">
        {/* <UseStatePractice /> */}
        {/* <UseEffectPractice /> */}
        {/* <UseLayoutEffectPractice /> */}
        {/* <UseRefPractice /> */}
        {/* <UseReducerPractice /> */}
        {/* <UseCallbackPractice /> */}
        {/* <UseMemoPractice /> */}
        {/* <UseContextPractice>
        <NormalComponent />
      </UseContextPractice> */}
        {/* <UseTransitionPractice /> */}
        {/* <UseDeferredValuePractice /> */}
        {/* <UseImperativeHandlePractice /> */}
        {/* <UseDebugValuePractice /> */}
        {/* <JustPractice /> */}
        {/* <JustPracticeTwo /> */}
        {/* <JustPracticeThree /> */}
        {/* <JustPracticeFour /> */}
      </section>
      <section className="custom-hooks">
        {/* <div style={styleTheme}>
          <h1>Toggle Component</h1>
          <ToggleComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>TimeOut Component</h1>
          <TimeoutComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>Debounce Component</h1>
          <DebounceComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>UpdateEffect Component</h1>
          <UpdateEffectComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>Array Component</h1>
          <ArrayCompone
          nt />
        </div> */}
        {/* <div style={styleTheme}>
          <h1>Previous Component</h1>
          <PreviousComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>StateHistory Component</h1>
          <StateHistoryComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>Storage Component</h1>
          <StorageComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>Fetch Component</h1>
          <FetchComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>DeepCompareEffect Component</h1>
          <DeepCompareEffectComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>EventListener Component</h1>
          <EventListenerComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>OnScreen Component</h1>
          <OnScreenComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>WindowSize Component</h1>
          <WindowSizeComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>MediaQuery Component</h1>
          <MediaQueryComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>Geolocation Component</h1>
          <GeolocationComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>StateWithValidation Component</h1>
          <StateWithValidationComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>Size Component</h1>
          <SizeComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>EffectOnce Component</h1>
          <EffectOnceComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>ClickOutside Component</h1>
          <ClickOutsideComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>DarkMode Component</h1>
          <DarkModeComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>CopyToClipboard Component</h1>
          <CopyToClipboardComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>Cookie Component</h1>
          <CookieComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>OnlineStatus Component</h1>
          <OnlineStatusComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>RenderCount Component</h1>
          <RenderCountComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>DebugInfo Component</h1>
          <DebugInfoComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>Hover Component</h1>
          <HoverComponent />
        </div> */}

        {/* <div style={styleTheme}>
          <h1>LongPress Component</h1>
          <LongPressComponent />
        </div> */}
      </section>
      <section className="practice-session">
        {/* <div style={styleTheme}> */}
        <PracticeSession />
        {/* </div> */}
      </section>
    </main>
  );
};

export default App;
