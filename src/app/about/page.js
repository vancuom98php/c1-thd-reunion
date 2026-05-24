"use client";
import { C, F } from '@/components/tokens';
import { GoldDivider, SectionTag } from '@/components/ui';
import { useIntersectionAnim } from '@/components/hooks';

export default function PageAbout() {
  const ref = useIntersectionAnim();
  return (
    <div ref={ref} style={{ background: 'transparent', minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div className="anim-in" style={{ textAlign: 'center', marginBottom: 64 }}>
          <SectionTag>Câu Chuyện Của Chúng Ta</SectionTag>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900, color: C.gold, letterSpacing: '0.06em', marginBottom: 16, textShadow: '0 0 40px rgba(245,215,161,0.25)' }}>Mười Năm, Một Hành Trình</h2>
          <GoldDivider style={{ maxWidth: 300, margin: '0 auto' }} />
        </div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 48, alignItems: 'start' }}>
          <div className="about-col-left">
            <div className="anim-in about-year-card about-2016" style={{ background: 'linear-gradient(135deg,#4A1015,#260D0D)', border: `1px solid ${C.goldLine}`, borderRadius: 12, padding: 32, marginBottom: 24, boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
              <div style={{ fontFamily: F.display, fontSize: 48, fontWeight: 900, color: C.gold, lineHeight: 1, marginBottom: 8, textShadow: '0 0 30px rgba(245,215,161,0.3)' }}>2016</div>
              <div style={{ fontFamily: F.serif, fontSize: 20, fontWeight: 600, color: C.gold, marginBottom: 12 }}>Ngày chia tay mái trường</div>
              <p style={{ fontFamily: F.body, fontSize: 15, color: C.white70, lineHeight: 1.8 }}>Lớp C1 chúng ta đã khép lại những năm tháng học trò với biết bao kỷ niệm: tiếng trống trường, trang vở cũ, những lần kiểm tra bất chợt, những buổi tan học vội vàng và cả lời hẹn sẽ gặp lại nhau vào một ngày không xa.</p>
            </div>

            <div className="anim-in about-year-card about-2026" style={{ background: 'linear-gradient(135deg,#3D0C10,#1A0B0B)', border: `1px solid ${C.goldLine}`, borderRadius: 12, padding: 32, boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
              <div style={{ fontFamily: F.display, fontSize: 48, fontWeight: 900, color: C.gold, lineHeight: 1, marginBottom: 8, textShadow: '0 0 30px rgba(245,215,161,0.3)' }}>2026</div>
              <div style={{ fontFamily: F.serif, fontSize: 20, fontWeight: 600, color: C.gold, marginBottom: 12 }}>Ngày trở về</div>
              <p style={{ fontFamily: F.body, fontSize: 15, color: C.white70, lineHeight: 1.8 }}>Mười năm trôi qua, mỗi người đã đi trên một con đường riêng. Có người lập nghiệp, có người xây dựng gia đình, có người vẫn đang tiếp tục theo đuổi ước mơ. Nhưng khi trở về bên nhau, chúng ta vẫn là C1 của những năm tháng thanh xuân rực rỡ.</p>
            </div>
          </div>

          <div className="about-col-right">
            <div className="anim-in about-story" style={{ marginBottom: 24 }}>
              <p style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 'clamp(18px,2vw,24px)', color: C.white90, lineHeight: 1.8, marginBottom: 24, borderLeft: `3px solid ${C.goldMuted}`, paddingLeft: 20 }}>
                &quot;Mười năm không chỉ là thời gian. Đó là hành trình mỗi người tự viết nên câu chuyện của mình.&quot;
              </p>
              <p style={{ fontFamily: F.body, fontSize: 15, color: C.white70, lineHeight: 1.85, marginBottom: 16 }}>
                Năm 2016, chúng ta rời xa mái trường cấp 3 với chiếc áo trắng, quyển lưu bút và những lời hứa hẹn còn vụng dại. Ngày ấy, ai cũng mang theo cho mình những ước mơ, những dự định và một chút tiếc nuối của tuổi học trò.
              </p>
              <p style={{ fontFamily: F.body, fontSize: 15, color: C.white70, lineHeight: 1.85, marginBottom: 16 }}>
                Mười năm sau, chúng ta gặp lại nhau khi mỗi người đã có thêm nhiều câu chuyện, nhiều trải nghiệm và nhiều đổi thay. Nhưng có một điều vẫn còn nguyên vẹn: ký ức về lớp C1, về những giờ học chung, những trò nghịch ngợm, những lần cùng nhau vượt qua mùa thi và những tình bạn tưởng bình thường mà hóa ra rất đáng quý.
              </p>
              <p style={{ fontFamily: F.body, fontSize: 15, color: C.white70, lineHeight: 1.85 }}>
                <strong style={{ color: C.gold }}>10 năm – một lần hội ngộ</strong> không chỉ để nhìn lại chặng đường đã qua, mà còn để cùng nhau nhắc nhớ rằng: chúng ta đã từng có một thanh xuân rất đẹp bên nhau.
              </p>
            </div>

            <div className="anim-in about-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { n: '10', label: 'Năm xa cách' },
                { n: '40+', label: 'Thành viên lớp' },
                { n: '1 ngày', label: 'Hội ngộ' },
                { n: '∞', label: 'Kỷ niệm' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'linear-gradient(135deg,#4A1015,#260D0D)', border: `1px solid ${C.goldLine}`, borderRadius: 10, padding: '20px 16px', textAlign: 'center' }}>
                  <div style={{ fontFamily: F.display, fontSize: 32, fontWeight: 900, color: C.gold, lineHeight: 1, textShadow: '0 0 20px rgba(245,215,161,0.3)' }}>{item.n}</div>
                  <div style={{ fontFamily: F.body, fontSize: 11, color: C.goldMuted, letterSpacing: '0.1em', marginTop: 6, textTransform: 'uppercase' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
