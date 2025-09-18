import { ArrowRight, Video, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ToolsExploreSection() {
  return (
    <div className="w-full flex flex-col gap-2.5 relative">
      <div className="flex flex-col gap-8 p-6 rounded-[20px] bg-white/[0.04] backdrop-blur-sm  relative">
        {/* Header Section */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <h2 className="text-[32px] font-medium leading-8 tracking-[0px]">
              <span className="text-white">Explore different tools to unlock </span>
              <span className="bg-gradient-to-r from-[#FFC32B] via-[#FB43DA] via-[#D684FF] to-[#17E2EA] bg-clip-text text-transparent">
                student success
              </span>
            </h2>
            <p className="text-white/60 text-[16px] leading-normal tracking-[0.13px] max-w-[575px] font-sans">
              Transform learning outcomes with our comprehensive suite of intervention tools. From 1-on-1 tutoring to AI-powered support, give every student the personalized help they need to thrive.
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 px-4 rounded-full border-white text-white text-xs font-medium tracking-wide font-sans bg-transparent hover:bg-white/10"
          >
            View all
          </Button>
        </div>

        {/* Cards Grid */}
        <div className="flex gap-4 w-full">
          {/* Live Classes Card */}
          <div className="flex flex-col flex-1 rounded-2xl border border-white/[0.12] bg-gradient-to-b from-[rgba(66,77,84,0.1)] to-[rgba(66,77,84,0.1)] bg-[#161C2C] overflow-hidden relative">
            {/* Image Section */}
            <div className="h-[148px] bg-[#337A63] relative overflow-hidden">
              {/* Gradient overlay */}
              <div 
                className="absolute -left-[77px] -top-[172px] w-[787px] h-[344px] rounded-full opacity-20 blur-[39px]"
                style={{
                  background: 'linear-gradient(87deg, #FFC32B 6.9%, #FB43DA 24.63%, #D684FF 30.26%, #17E2EA 44.43%)'
                }}
              />
              {/* Main image */}
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/98d1b8c4749aadfcb3e456effff626181da9b7b4?width=590" 
                alt="Middle school girl learning"
                className="w-[295px] h-[295px] absolute left-[1px] top-[-87px] object-cover"
              />
              
              {/* Video call frames */}
              <div className="absolute right-[14px] top-[14px] space-y-[10px]">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-9 h-9 relative">
                    <div className="w-9 h-9 rounded-lg border-[0.67px] border-[#4A4BB6] absolute"></div>
                    <img 
                      src={`https://api.builder.io/api/v1/image/assets/TEMP/${i === 0 ? '296bf686a352f4705f055e9c9817cfa7fe04d4ff' : i === 1 ? '164309ff78aeb36c11d9c7012923f27d98e9936a' : '00c209a09a0d047ed48ff0933a0697ea33a65c58'}?width=72`}
                      alt={`Student ${i + 1}`}
                      className="w-9 h-9 rounded-lg border-[0.587px] border-[#A99DE3] absolute"
                    />
                    {/* Video/Audio indicators */}
                    <div className="absolute left-[2px] top-[27px] flex gap-[0.9px] items-center">
                      <div className="flex p-[0.9px] items-center rounded-[13px] bg-white/80">
                        <Video className="w-[3.6px] h-[3.6px] text-[#4A4BB6]" />
                      </div>
                      <div className="flex p-[0.9px] items-center rounded-[13px] bg-white/80">
                        <Mic className="w-[3.6px] h-[3.6px] text-[#4A4BB6]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Teacher frame */}
              <div className="absolute left-3 bottom-[86px] w-[49px] h-[49px] relative">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/b2b4c311d1addad52633966bd9771211b38e2543?width=98"
                  alt="Teacher"
                  className="w-[49px] h-[49px] rounded-lg border border-[#A99DE3]"
                />
                <div className="absolute left-[3px] bottom-[3px] flex gap-[1.4px] items-center">
                  <div className="flex p-[1.4px] items-center rounded-[21px] bg-white/80">
                    <Video className="w-[5.7px] h-[5.7px] text-[#4A4BB6]" />
                  </div>
                  <div className="flex p-[1.4px] items-center rounded-[21px] bg-white/80">
                    <Mic className="w-[5.7px] h-[5.7px] text-[#4A4BB6]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex p-3 items-center gap-1 bg-gradient-to-t from-[#161C2C] via-[rgba(22,28,44,0)] to-[rgba(22,28,44,0)]">
              <div className="flex flex-col gap-1 flex-1">
                <h3 className="text-white text-base font-medium leading-[13.67px]">
                  Live Classes
                </h3>
                <div className="h-[46.8px] py-[3.4px]">
                  <p className="text-white/64 text-xs leading-normal h-10 font-sans">
                    Interactive group learning<br />
                    Sub-matter experts as instructors
                  </p>
                </div>
              </div>
              <Button 
                size="icon" 
                className="h-auto w-auto p-2 rounded-full border border-white bg-transparent hover:bg-white/10"
              >
                <ArrowRight className="w-[8.5px] h-[8.5px] text-white" />
              </Button>
            </div>
          </div>

          {/* Practice Hub Card */}
          <div className="flex flex-col flex-1 rounded-2xl border border-white/[0.12] bg-gradient-to-b from-[rgba(66,77,84,0.1)] to-[rgba(66,77,84,0.1)] bg-[#161C2C] overflow-hidden relative">
            <div className="h-[148px] bg-[#C9B716] relative overflow-hidden">
              <div 
                className="absolute -left-[77px] -top-[172px] w-[787px] h-[344px] rounded-full opacity-20 blur-[39px]"
                style={{
                  background: 'linear-gradient(87deg, #FFC32B 6.9%, #FB43DA 24.63%, #D684FF 30.26%, #17E2EA 44.43%)'
                }}
              />
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/58fa92517c4a32a670e6d4e97fff4e9661403285?width=520"
                alt="Practice Hub interface"
                className="w-[260px] h-[163px] rounded-lg absolute left-[18px] top-4 object-cover"
              />
            </div>
            <div className="flex p-3 items-center gap-4 bg-gradient-to-t from-[#161C2C] via-[rgba(22,28,44,0)] to-[rgba(22,28,44,0)]">
              <div className="flex flex-col gap-1 flex-1">
                <h3 className="text-white text-base font-medium leading-[13.67px]">
                  Practice Hub
                </h3>
                <div className="h-[46.8px] py-[3.4px]">
                  <p className="text-white/64 text-xs leading-normal h-10 font-sans">
                    Get personalized tutoring, practice tests, and interactive tools to excel in any subject.
                  </p>
                </div>
              </div>
              <Button 
                size="icon" 
                className="h-auto w-auto p-2 rounded-full border border-white bg-transparent hover:bg-white/10"
              >
                <ArrowRight className="w-[8.5px] h-[8.5px] text-white" />
              </Button>
            </div>
          </div>

          {/* AI Tutor Card */}
          <div className="flex flex-col flex-1 rounded-2xl border border-white/[0.12] bg-gradient-to-b from-[rgba(66,77,84,0.1)] to-[rgba(66,77,84,0.1)] bg-[#161C2C] overflow-hidden relative">
            <div className="h-[148px] bg-[#D65799] relative overflow-hidden">
              <div 
                className="absolute -left-[77px] -top-[172px] w-[787px] h-[344px] rounded-full opacity-20 blur-[39px]"
                style={{
                  background: 'linear-gradient(87deg, #FFC32B 6.9%, #FB43DA 24.63%, #D684FF 30.26%, #17E2EA 44.43%)'
                }}
              />
              
              {/* AI Sparkle Icon */}
              <div className="absolute left-[23px] bottom-[34px] w-[29px] h-[29px] rounded-full bg-[#4C24AB] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-90">
                  <path opacity="0.2" d="M8.35315 5.49482L10.7304 6.37089C10.8003 6.39682 10.8605 6.44351 10.9031 6.50468C10.9456 6.56586 10.9684 6.63859 10.9684 6.7131C10.9684 6.78762 10.9456 6.86035 10.9031 6.92153C10.8605 6.9827 10.8003 7.02939 10.7304 7.05532L8.35315 7.93139C8.30298 7.94988 8.25741 7.97904 8.21959 8.01685C8.18178 8.05466 8.15262 8.10023 8.13413 8.15041L7.25806 10.5277C7.23213 10.5975 7.18544 10.6578 7.12427 10.7003C7.06309 10.7429 6.99036 10.7657 6.91585 10.7657C6.84133 10.7657 6.7686 10.7429 6.70743 10.7003C6.64625 10.6578 6.59956 10.5975 6.57363 10.5277L5.69756 8.15041C5.67907 8.10023 5.64991 8.05466 5.6121 8.01685C5.57429 7.97904 5.52872 7.94988 5.47854 7.93139L3.10129 7.05532C3.03143 7.02939 2.97118 6.9827 2.92863 6.92153C2.88609 6.86035 2.86328 6.78762 2.86328 6.7131C2.86328 6.63859 2.88609 6.56586 2.92863 6.50468C2.97118 6.44351 3.03143 6.39682 3.10129 6.37089L5.47854 5.49482C5.52872 5.47633 5.57429 5.44717 5.6121 5.40936C5.64991 5.37154 5.67907 5.32598 5.69756 5.2758L6.57363 2.89854C6.59956 2.82868 6.64625 2.76844 6.70743 2.72589C6.7686 2.68334 6.84133 2.66054 6.91585 2.66054C6.99036 2.66054 7.06309 2.68334 7.12427 2.72589C7.18544 2.76844 7.23213 2.82868 7.25806 2.89854L8.13413 5.2758C8.15262 5.32598 8.18178 5.37154 8.21959 5.40936C8.25741 5.44717 8.30298 5.47633 8.35315 5.49482Z" fill="white"/>
                  <path d="M8.35315 5.49482L10.7304 6.37089C10.8003 6.39682 10.8605 6.44351 10.9031 6.50468C10.9456 6.56586 10.9684 6.63859 10.9684 6.7131C10.9684 6.78762 10.9456 6.86035 10.9031 6.92153C10.8605 6.9827 10.8003 7.02939 10.7304 7.05532L8.35315 7.93139C8.30297 7.94988 8.25741 7.97904 8.21959 8.01685C8.18178 8.05466 8.15262 8.10023 8.13413 8.15041L7.25806 10.5277C7.23213 10.5975 7.18544 10.6578 7.12427 10.7003C7.06309 10.7429 6.99036 10.7657 6.91585 10.7657C6.84133 10.7657 6.7686 10.7429 6.70743 10.7003C6.64625 10.6578 6.59956 10.5975 6.57363 10.5277L5.69756 8.15041C5.67907 8.10023 5.64992 8.05466 5.6121 8.01685C5.57429 7.97904 5.52872 7.94988 5.47854 7.93139L3.10129 7.05532C3.03143 7.02939 2.97118 6.9827 2.92863 6.92153C2.88609 6.86035 2.86328 6.78762 2.86328 6.7131C2.86328 6.63859 2.88609 6.56586 2.92863 6.50468C2.97118 6.44351 3.03143 6.39682 3.10129 6.37089L5.47854 5.49482C5.52872 5.47633 5.57429 5.44717 5.6121 5.40936C5.64992 5.37155 5.67907 5.32598 5.69756 5.2758L6.57363 2.89854C6.59956 2.82868 6.64625 2.76843 6.70743 2.72589C6.7686 2.68334 6.84133 2.66054 6.91585 2.66054C6.99036 2.66054 7.06309 2.68334 7.12427 2.72589C7.18544 2.76843 7.23213 2.82868 7.25806 2.89854L8.13413 5.2758C8.15262 5.32598 8.18178 5.37155 8.21959 5.40936C8.25741 5.44717 8.30297 5.47633 8.35315 5.49482V5.49482Z" stroke="white" strokeWidth="0.73006" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1.0752 3.79285L3.26537 3.79285" stroke="white" strokeWidth="0.73006" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.16992 2.69776L2.16992 4.88794" stroke="white" strokeWidth="0.73006" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.62988 1.60266L5.09 1.60266" stroke="white" strokeWidth="0.73006" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.36035 0.872614V2.33273" stroke="white" strokeWidth="0.73006" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Chat Bubbles */}
              <div className="absolute left-10 top-0 w-[232px] h-[139px]">
                {/* Student question bubble */}
                <div className="absolute left-[35px] top-0 w-[197px] h-12 inline-flex justify-end items-center p-2 rounded-[14px] border border-white/[0.08] bg-white/70 backdrop-blur-[44px]">
                  <div className="w-[176px] h-8 text-black text-[7px] leading-normal absolute left-3 top-2 font-sans">
                    <span className="font-normal">I solved this quadratic equation:</span>
                    <span className="font-bold"> x^2 - 5x + 6 = 0. I got x = 2 and x = 3</span>
                    <span className="font-normal">, but I don&apos;t fully understand why factoring works. Can you walk me through step by step how factoring actually gives the solutions?</span>
                  </div>
                </div>

                {/* AI response bubble */}
                <div className="absolute left-0 top-[58px] w-[229px] h-[81px] inline-flex justify-center items-center p-2 rounded-[14px] border border-white/[0.08] bg-gradient-to-r from-[rgba(9,5,20,0.18)] to-[rgba(77,46,172,0.03)] bg-[rgba(18,16,29,0.70)] backdrop-blur-[44px]">
                  <div className="w-[209px] h-16 text-white text-[7px] leading-normal absolute left-3 top-2 font-sans">
                  Great question, Sally! Let&apos;s explore why factoring helps us solve a quadratic equation like x^2 - 5x + 6 = 0.
                    <br /><br />
                    First, why do we set the equation equal to zero? What happens to a product when it equals zero? Now, let&apos;s look at factoring: If you write the quadratic as (x - a)(x - b) = 0, what does that tell you about x? Can you tell me what must be true for the product (x - a)(x - b) to equal zero?
                  </div>
                </div>
              </div>
            </div>
            <div className="flex p-3 items-center gap-4 bg-gradient-to-t from-[#161C2C] via-[rgba(22,28,44,0)] to-[rgba(22,28,44,0)]">
              <div className="flex flex-col gap-1 flex-1">
                <h3 className="text-white text-base font-medium leading-[13.67px]">
                  AI Tutor
                </h3>
                <div className="h-[46.8px] py-[3.4px]">
                  <p className="text-white/64 text-xs leading-normal h-10 font-sans">
                    Get personalized tutoring, practice tests, and interactive tools to excel in any subject.
                  </p>
                </div>
              </div>
              <Button 
                size="icon" 
                className="h-auto w-auto p-2 rounded-full border border-white bg-transparent hover:bg-white/10"
              >
                <ArrowRight className="w-[8.5px] h-[8.5px] text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
