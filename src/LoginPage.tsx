import "./LoginPage.css"
import cloud from './assets/cloud.svg';
import diamond from './assets/diamond.svg';
import diamond1 from './assets/diamond1.svg';

function LoginPage() {
    return (
      <div className="global">
      <div className="hor-line"></div>
      <div className="retroImage">
        <img
          className="pingPongGif"
          src="https://s3-alpha-sig.figma.com/img/37c9/86c9/dd0cf1c3addcb3305470d3164cf686b2?Expires=1694995200&Signature=VmADL6-qK0yfRuoktkD20UiUVsg0X09PZzyeRrrbyYSXLfnpHBSD~51w3QLEWwdDJaZAjDVq2W4QPb2IwL~XeRGKGrukl35EgYLf0PUFDzUiqWICZqm3VQoKUtP5VrOKiCEryT5mOZYoQ6vRrWZekR6d9tF1x1S0rpTa4ZT7Dlu4RkgIRqEVZ~YhU3k97tqnlaSU-0sVOxQdYJd2zdC9-WxQJQqZJ4nDfPA1ew1s1MDq48wjf4IrkbG3YEFJKKavmt9Svcu6tkdKfNnE2uBszxYO-gPXsGSYuzunwOBbq9g22cFF1oO4V6IYY1C2IzwVIEvIDd1PMqWYv8lSzmYevA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"          alt="pingPongGif"
        />
      </div>
      <div className="cloudImg">
          <img src={cloud} alt="cloudImg" />
        </div>
      <div className="diamondImg">
          <img src={diamond} alt="diamondImg "/>
      </div>
      <div className="diamondImg1">
          <img src={diamond1} alt="diamondImg1 "/>
      </div>
      <div className="loginBox">
        <div className="loginBoxInside">SIGN IN</div>
          <div className="loginBoxOutside"></div>
            <div className="text-OR">-- OR --</div>
            <div className="box box-top"> 
                <a className="nes-btn is-primary google" href="/">Google</a>
            </div>
            <div className="box box-bottom">
              <a className="nes-btn intra" href="/">Intra 42</a>
            </div>
      </div>
      </div>
    );
}
export default LoginPage
