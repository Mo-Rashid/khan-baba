import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import Portfolio from "./Portfolio/Portfolio";
import BugBounty from "./BugBounty/BugBounty";
import EthicalHacking from "./EthicalHacking/EthicalHacking";
import RedTeaming from './RedTeaming/RedTeaming';
import AIRedTeaming from "./AIRedTeaming/AIRedTeaming";
import AllCTFLab from "./AllCTFLab/AllCTFLab";

import XSS from "./BugBounty/BugBountyCourse/XSS/XSS";
import SQLi from "./BugBounty/BugBountyCourse/SQLi/SQLi";

import XXE from "./BugBounty/BugBountyCourse/XXE/XXE";
import SSRF from "./BugBounty/BugBountyCourse/SSRF/SSRF";
import IDOR from "./BugBounty/BugBountyCourse/IDOR/IDOR";
import AuthBypass from "./BugBounty/BugBountyCourse/AuthBypass/AuthBypass";
import RCE from "./BugBounty/BugBountyCourse/RCE/RCE";
import APISecurity from "./BugBounty/BugBountyCourse/APISecurity/APISecurity";
import BusinessLogic from "./BugBounty/BugBountyCourse/BusinessLogic/BusinessLogic";
import FileUpload from "./BugBounty/BugBountyCourse/FileUpload/FileUpload";

import RedTeamFundamentals from "./RedTeaming/RedTeamingCourses/RedTeamFundamentals/RedTeamFundamentals";


import ReconOSINT 
from "./RedTeaming/RedTeamingCourses/ReconOSINT/ReconOSINT";



import InitialAccessTechniques 
from "./RedTeaming/RedTeamingCourses/InitialAccessTechniques/InitialAccessTechniques";


import PayloadDevelopment 
from "./RedTeaming/RedTeamingCourses/PayloadDevelopment/PayloadDevelopment";

import PrivilegeEscalation 
from "./RedTeaming/RedTeamingCourses/PrivilegeEscalation/PrivilegeEscalation";

import CloudRedTeaming 
from "./RedTeaming/RedTeamingCourses/CloudRedTeaming/CloudRedTeaming";

import ExternalNetworkPentesting 
from "./RedTeaming/RedTeamingCourses/ExternalNetworkPentesting/ExternalNetworkPentesting";

import MobileRedTeaming 
from "./RedTeaming/RedTeamingCourses/MobileRedTeaming/MobileRedTeaming";

import WirelessNetworkAttacks 
from "./RedTeaming/RedTeamingCourses/WirelessNetworkAttacks/WirelessNetworkAttacks";

import ActiveDirectoryAttacks 
from "./RedTeaming/RedTeamingCourses/ActiveDirectoryAttacks/ActiveDirectoryAttacks";

// Import AI Red Teaming Courses
// AI Red Teaming Courses

import AIRedTeamFundamentals 
from "./AIRedTeaming/AIRedTeamingCourses/AIRedTeamFundamentals/AIRedTeamFundamentals";
import LLMSecurity 
from "./AIRedTeaming/AIRedTeamingCourses/LLMSecurity/LLMSecurity";

import PromptInjectionAttacks from "./AIRedTeaming/AIRedTeamingCourses/PromptInjectionAttacks/PromptInjectionAttacks";


import LLMJailbreaking 
from "./AIRedTeaming/AIRedTeamingCourses/LLMJailbreaking/LLMJailbreaking";
import AIAgentSecurity 
from "./AIRedTeaming/AIRedTeamingCourses/AIAgentSecurity/AIAgentSecurity";
import RAGSecurity 
from "./AIRedTeaming/AIRedTeamingCourses/RAGSecurity/RAGSecurity";
import AIApplicationPentesting 
from "./AIRedTeaming/AIRedTeamingCourses/Data-lekage-memory/DataLeakageMemorization";
import AdversarialMachineLearning 
from "./AIRedTeaming/AIRedTeamingCourses/AdversarialMachineLearning/AdversarialMachineLearning";

import AIRiskAssessment 
from "./AIRedTeaming/AIRedTeamingCourses/AIRiskAssesment/AIRiskAssessment";

import AIRedTeamLabsCTF 
from "./AIRedTeaming/AIRedTeamingCourses/AIRedTeamMethodology/AIRedTeamMethodology";

import IntroductionToEthicalHacking 
from "./EthicalHacking/EthicalHackingCourses/IntroductionToEthicalHacking/IntroductionToEthicalHacking";

import LinuxBasicsForHackers 
from "./EthicalHacking/EthicalHackingCourses/LinuxBasicsForHackers/LinuxBasicsForHackers";

import NetworkingFundamentals 
from "./EthicalHacking/EthicalHackingCourses/NetworkingFundamentals/NetworkingFundamentals";

import FootprintingAndReconnaissance 
from "./EthicalHacking/EthicalHackingCourses/FootprintingAndReconnaissance/FootprintingAndReconnaissance";

import ScanningTechniques 
from "./EthicalHacking/EthicalHackingCourses/ScanningTechniques/ScanningTechniques";

import EnumerationTechniques 
from "./EthicalHacking/EthicalHackingCourses/EnumerationTechniques/EnumerationTechniques";

import SocialEngineering 
from "./EthicalHacking/EthicalHackingCourses/SocialEngineering/SocialEngineering";

import SniffingAndSpoofing 
from "./EthicalHacking/EthicalHackingCourses/SniffingAndSpoofing/SniffingAndSpoofing";

import SessionHijacking 
from "./EthicalHacking/EthicalHackingCourses/SessionHijacking/SessionHijacking";

import PasswordAttacks 
from "./EthicalHacking/EthicalHackingCourses/PasswordAttacks/PasswordAttacks";

import VulnerabilityAssessment 
from "./EthicalHacking/EthicalHackingCourses/VulnerabilityAssessment/VulnerabilityAssessment";

import NetworkPentesting 
from "./EthicalHacking/EthicalHackingCourses/NetworkPentesting/NetworkPentesting";

// import the lab 

import XSSLab from "./AllCTFLab/ctflab/web/xss";
import SQLiLab from "./AllCTFLab/ctflab/web/sqli";
import SSRFLab from "./AllCTFLab/ctflab/web/ssrf";
import CSRFLab from "./AllCTFLab/ctflab/web/csrf";
import XXELab from "./AllCTFLab/ctflab/web/xxe";
import IDORLab from "./AllCTFLab/ctflab/web/idor";
import FileUploadLab from "./AllCTFLab/ctflab/web/file-upload";

import AWSLab from "./AllCTFLab/ctflab/cloud/aws/AWSLab";
import AzureLab from "./AllCTFLab/ctflab/cloud/azure/AzureLab";
import GCPLab from "./AllCTFLab/ctflab/cloud/google/GCPLab";

import AndroidLab from "./AllCTFLab/ctflab/mobile/android/AndroidLab";
import IOSLab from "./AllCTFLab/ctflab/mobile/ios/iOSLab";
import APKLab from "./AllCTFLab/ctflab/mobile/apk-analysis/APKLab";

import HardcodeFlag from "./AllCTFLab/ctflab/mobile/hardcodeFlag/HardcodeFlag";
import VulnApktool from "./AllCTFLab/ctflab/mobile/vulnApktool/VulnApktool";
import VulnX from "./AllCTFLab/ctflab/mobile/vulnX/VulnX";
import VulnX2 from "./AllCTFLab/ctflab/mobile/vulnX2/VulnX2";


//  ai 

import PromptInjectionLab from "./AllCTFLab/ctflab/Ai/prompt-injection";
import LLMJailbreakLab from "./AllCTFLab/ctflab/Ai/llm-jailbreak";
import RAGSecurityLab from "./AllCTFLab/ctflab/Ai/rag-security";

import CustomerSupportLab from "./AllCTFLab/ctflab/Ai/customer-support";
import SystemPromptLeakLab
  from "./AllCTFLab/ctflab/Ai/system-prompt-leak";

import IndirectInjectionLab
  from "./AllCTFLab/ctflab/Ai/indirect-injection";

import ToolAbuseLab
  from "./AllCTFLab/ctflab/Ai/tool-abuse";

import MultiTurnJailbreakLab
  from "./AllCTFLab/ctflab/Ai/multi-turn-jailbreak";

import GuardrailBypassLab
  from "./AllCTFLab/ctflab/Ai/guardrail-bypass";



import SystemHackingLab 
  from "./AllCTFLab/ctflab/redteam/system-hacking/SystemHackingLab";
import ReverseEngineeringLab
  from "./AllCTFLab/ctflab/redteam/reverse-engineering";

import NetworkPentestingLab
  from "./AllCTFLab/ctflab/redteam/network-pentesting";

import WebRedTeamLab
  from "./AllCTFLab/ctflab/redteam/web-redteam";

import SocialEngineeringLab
  from "./AllCTFLab/ctflab/redteam/social-engineering";









function App() {

    return (

        <Routes>




              

                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/portfolio" element={<Portfolio />} />

                <Route path="/bug-bounty" element={<BugBounty />} />

                <Route path="/ethical-hacking" element={<EthicalHacking />} />

                <Route path="/red-teaming" element={<RedTeaming />} />

                <Route path="/ai-red-teaming" element={<AIRedTeaming />} />
                <Route path="/navbar" element={<Navbar />} />
                <Route path="/all-ctf-lab" element={<AllCTFLab />} />
                <Route element={<ProtectedRoute />}>        
                
                
                </Route>


              <Route  path="/ctf-lab/redteam-reverse-engineering"  element={<ReverseEngineeringLab />}/>
              <Route  path="/ctf-lab/redteam-network-pentesting"  element={<NetworkPentestingLab />}/>
              <Route  path="/ctf-lab/redteam-web"  element={<WebRedTeamLab />}/>
              <Route  path="/ctf-lab/redteam-social-engineering"  element={<SocialEngineeringLab />}/>
              <Route path="/ctf-lab/redteam-system-hacking" element={<SystemHackingLab />} />


              





              <Route  path="/ctf-lab/prompt-injection-lab"  element={<PromptInjectionLab />}/>
              <Route  path="/ctf-lab/llm-jailbreak-lab"  element={<LLMJailbreakLab />}/>
              <Route  path="/ctf-lab/rag-security-lab"  element={<RAGSecurityLab />}/>

              <Route  path="/ctf-lab/customer-support-ai-lab"  element={<CustomerSupportLab />}/>
              <Route   path="/ctf-lab/system-prompt-leak"  element={<SystemPromptLeakLab />}/>
              <Route  path="/ctf-lab/indirect-injection"  element={<IndirectInjectionLab />}/>
              <Route  path="/ctf-lab/tool-abuse"  element={<ToolAbuseLab />}/>
              <Route  path="/ctf-lab/multi-turn-jailbreak"  element={<MultiTurnJailbreakLab />}/>
              <Route  path="/ctf-lab/guardrail-bypass"  element={<GuardrailBypassLab />}/>





                <Route  path="/ctf-lab/cloud-aws-lab"  element={<AWSLab />}/>
                <Route  path="/ctf-lab/cloud-azure-lab"  element={<AzureLab />}/>
                <Route  path="/ctf-lab/cloud-gcp-lab"  element={<GCPLab />}/>

                <Route  path="/ctf-lab/mobile-android-lab"  element={<AndroidLab />}/>
                <Route  path="/ctf-lab/mobile-ios-lab"  element={<IOSLab />}/>
                <Route  path="/ctf-lab/mobile-apk-analysis"  element={<APKLab />}/>

                <Route  path="/ctf-lab/mobile-hardcode-flag"  element={<HardcodeFlag />}/>
                <Route  path="/ctf-lab/mobile-vuln-apktool"  element={<VulnApktool />}/>
                <Route  path="/ctf-lab/mobile-vulnx"  element={<VulnX />}/>
                <Route  path="/ctf-lab/mobile-vulnx2"  element={<VulnX2 />}/>
                




                <Route path="/bug-bounty/course/xss" element={<XSS />} />
                <Route path="/bug-bounty/course/sqli" element={<SQLi />} />
                <Route path="/bug-bounty/course/xxe" element={<XXE />} />
                <Route path="/bug-bounty/course/ssrf" element={<SSRF />} />
                <Route path="/bug-bounty/course/idor" element={<IDOR />} />
                <Route path="/bug-bounty/course/auth-bypass" element={<AuthBypass />} />
                <Route path="/bug-bounty/course/rce" element={<RCE />} />
                <Route path="/bug-bounty/course/api-security" element={<APISecurity />} />
                <Route path="/bug-bounty/course/business-logic" element={<BusinessLogic />} />
                <Route path="/bug-bounty/course/file-upload" element={<FileUpload />} />

                <Route path="/red-teaming/course/red-team-fundamentals" element={<RedTeamFundamentals/>}/>
                <Route path="/red-teaming/course/recon-osint" element={<ReconOSINT/>} />
                <Route path="/red-teaming/course/initial-access-techniques" element={<InitialAccessTechniques />} />
                <Route path="/red-teaming/course/payload-development-fundamentals" element={<PayloadDevelopment/>}/>
                <Route path="/red-teaming/course/privilege-escalation" element={<PrivilegeEscalation/>}/>
                <Route path="/red-teaming/course/cloud-red-teaming" element={<CloudRedTeaming/>}/>
                <Route path="/red-teaming/course/external-network-pentest" element={<ExternalNetworkPentesting/>} />
                <Route path="/red-teaming/course/mobile-red-teaming"element={<MobileRedTeaming/>}/>
                <Route path="/red-teaming/course/wireless-network-attacks"element={<WirelessNetworkAttacks/>}/>
                <Route path="/red-teaming/course/active-directory-attacks"element={<ActiveDirectoryAttacks/>}/>





                {/* AI Red Team Fundamentals */}
              <Route  path="/ai-red-teaming/course/ai-red-teaming-fundamentals"  element={<AIRedTeamFundamentals/>}/>
             
              <Route path="/ai-red-teaming/course/llm-security" element={<LLMSecurity/>}/>

                                               
               <Route          path="/ai-red-teaming/course/prompt-injection"          element={<PromptInjectionAttacks />}        />      

               <Route path="/ai-red-teaming/course/jailbreaking-llms" element={<LLMJailbreaking/>} />
               <Route path="/ai-red-teaming/course/ai-agents-tools" element={<AIAgentSecurity/>} />
               <Route path="/ai-red-teaming/course/rag-attacks" element={<RAGSecurity/>}/>
               <Route path="/ai-red-teaming/course/data-leakage-memorization" element={<AIApplicationPentesting/>} />
               <Route path="/ai-red-teaming/course/adversarial-ml" element={<AdversarialMachineLearning/>} />
               <Route path="/ai-red-teaming/course/ai-risk-assessment" element={<AIRiskAssessment/>} />
               <Route path="/ai-red-teaming/course/ai-red-team-methodology" element={<AIRedTeamLabsCTF/>} />


               <Route path="/ethical-hacking"element={<EthicalHacking />}/>

               <Route path="/ethical-hacking/course/introduction-to-ethical-hacking"element={<IntroductionToEthicalHacking />}/>
               <Route path="/ethical-hacking/course/linux-basics-for-hackers"element={<LinuxBasicsForHackers />}/>
               <Route path="/ethical-hacking/course/networking-fundamentals"element={<NetworkingFundamentals />}/>
               <Route path="/ethical-hacking/course/footprinting-and-reconnaissance" element={<FootprintingAndReconnaissance />}/>
               <Route path="/ethical-hacking/course/scanning-techniques"element={<ScanningTechniques />}/>
     

               <Route path="/ethical-hacking/course/enumeration-techniques"  element={<EnumerationTechniques />} />
               <Route path="/ethical-hacking/course/social-engineering" element={<SocialEngineering />} />

             

               <Route path="/ethical-hacking/course/sniffing-and-spoofing" element={<SniffingAndSpoofing />}/>
               <Route path="/ethical-hacking/course/session-hijacking" element={<SessionHijacking />} />
               <Route path="/ethical-hacking/course/password-attacks" element={<PasswordAttacks />} />
               <Route path="/ethical-hacking/course/vulnerability-assessment" element={<VulnerabilityAssessment />}/>
               <Route path="/ethical-hacking/course/network-pentesting" element={<NetworkPentesting />}/>
               
                <Route path="/ai-red-teaming" element={<AIRedTeaming/>}/>




               // CTF Labs Routes
                
                <Route  path="/ctf-lab/web-xss-lab" element={<XSSLab />}/>
                <Route path="/ctf-lab/web-sqli-lab" element={<SQLiLab />}/>

                <Route path="/ctf-lab/web-ssrf-lab" element={<SSRFLab />} />
                <Route path="/ctf-lab/web-csrf-lab" element={<CSRFLab />} />
                <Route path="/ctf-lab/web-xxe-lab" element={<XXELab />} />
                <Route path="/ctf-lab/web-idor-lab" element={<IDORLab />} />
                <Route path="/ctf-lab/web-file-upload-lab" element={<FileUploadLab />} />
                
        </Routes>

    );

}

export default App;