"use client";
import { useState } from "react";

const C = {
  bg: "#060608",
  card: "#0c0c10",
  border: "#1a1a24",
  red: "#e63946",
  orange: "#f4722b",
  yellow: "#f5c842",
  white: "#f0ede8",
  muted: "#5a5a6e",
  text: "#d4d0cb",
  dim: "#2a2a36",
};

const sections = [
  {
    id: "equation",
    label: "新規集客の方程式",
    icon: "∑",
  },
  {
    id: "channels",
    label: "チャネル因数分解",
    icon: "⊕",
  },
  {
    id: "hq_vs_store",
    label: "本部 vs 店舗 分担",
    icon: "▦",
  },
  {
    id: "tactics",
    label: "戦術ロードマップ",
    icon: "→",
  },
  {
    id: "kpi",
    label: "KPI管理体系",
    icon: "◎",
  },
];

const channelData = [
  {
    name: "口コミ・紹介",
    share: "43〜65%",
    icon: "💬",
    color: C.yellow,
    who: "店舗主導",
    lever: "高い",
    speed: "遅い（3〜6ヶ月）",
    cost: "ほぼゼロ",
    desc: "全店舗で最大チャネル。体験の感動がそのまま口コミになる。「グッジョブ！」「顔を覚えてくれた」などCSコメントが口コミ化している。",
    hq_action: "「口コミ化しやすい体験設計」のマニュアル化・横展開。接客スクリプトの統一。",
    store_action: "毎回の接客で「話したくなる体験」を作る。完食コール、声かけ、顔を覚える。",
  },
  {
    name: "Googleマップ（MEO）",
    share: "8〜21%",
    icon: "📍",
    color: C.red,
    who: "本部主導",
    lever: "最高",
    speed: "中期（1〜3ヶ月）",
    cost: "低〜中",
    desc: "津田沼だけが20.9%。他店は8〜12%と低い。「ラーメン 津田沼」「二郎系 新潟」などの検索需要はすでに存在している。取りに行くだけ。",
    hq_action: "全店のGBP（Googleビジネスプロフィール）を本部が一括管理・最適化。写真・営業時間・メニュー・投稿を週次更新。口コミ返信も本部で対応。",
    store_action: "来店後のQRコードでGoogle口コミ投稿を促す導線設置。",
  },
  {
    name: "公式SNS（TikTok/Instagram/X）",
    share: "6〜17%",
    icon: "📱",
    color: C.orange,
    who: "本部主導",
    lever: "最高（バイラル時）",
    speed: "即時〜中期",
    cost: "中（制作費）",
    desc: "現在は6〜17%だが、二郎系はSNS相性が最高クラス。「マシマシ」「ビジュアル」「コール」は全てバズ要素。弘前の口コミ64.6%はSNS増幅で全国展開できる。",
    hq_action: "本部がコンテンツ戦略を統括。TikTok/Reels用の縦型動画を月8〜12本制作。各店のバズ素材を集約し本部アカウントで拡散。",
    store_action: "「映える瞬間」の動画素材を日常的に本部へ送る。スタッフ出演OK確認。",
  },
  {
    name: "通りがかり・立地",
    share: "8〜22%",
    icon: "🚶",
    color: "#36d399",
    who: "出店戦略（本部）",
    lever: "低（既存店は変えられない）",
    speed: "即時",
    cost: "店舗投資",
    desc: "青森は22.1%と高い。立地の強みがある店は「店頭施策」でさらに取り込める。のぼり・看板・外待ち列の見せ方が集客に直結。",
    hq_action: "新規出店時の立地スコアリング基準を設ける。既存店は店頭POP・のぼりを本部制作で統一配備。",
    store_action: "外待ち列を「宣伝」として整備。行列が見える位置での待機誘導。",
  },
  {
    name: "LINEプッシュ配信",
    share: "直接計測困難",
    icon: "💚",
    color: "#22c55e",
    who: "本部主導",
    lever: "高（既存友だち限定）",
    speed: "即時",
    cost: "低",
    desc: "既存友だちへの再訪促進が主目的だが、「友だち紹介キャンペーン」を設計すれば新規獲得チャネルにもなる。累計友だち数は全店合計で既に相当数に達している。",
    hq_action: "「友だち招待で次回割引」キャンペーンの本部設計。Lステップで自動配信シナリオ構築。",
    store_action: "レジ前・待ち時間でのLINE登録促進（QRコード常設・口頭案内）。",
  },
  {
    name: "食べログ・ぐるなび",
    share: "計測なし（推定5%以下）",
    icon: "🍜",
    color: C.muted,
    who: "本部主導",
    lever: "中",
    speed: "中期",
    cost: "中",
    desc: "「二郎系 〇〇市」の検索需要を取り込む。現在データなしだが、特に新規出店時の認知獲得に有効。",
    hq_action: "全店の食べログ/ぐるなびページを本部が管理・写真更新。百名店・地域賞への申請も本部が行う。",
    store_action: "食べ終わった客への「食べログ投稿」依頼文の掲示。",
  },
];

const hqResponsibilities = [
  {
    category: "ブランド戦略（6〜12ヶ月で実施）",
    color: C.red,
    tasks: [
      { task: "「限界を超えろ」ブランドの言語化・ビジュアル統一", impact: "高", urgency: "中" },
      { task: "全店統一のコンテンツガイドライン策定", impact: "高", urgency: "中" },
      { task: "新規出店時の立地スコアリング基準策定", impact: "高", urgency: "低" },
      { task: "PR・メディア露出戦略（フードライター招待等）", impact: "高", urgency: "中" },
    ],
  },
  {
    category: "デジタル集客インフラ（1〜3ヶ月で実施）",
    color: C.orange,
    tasks: [
      { task: "全店GBP（Googleビジネスプロフィール）の本部管理体制構築", impact: "最高", urgency: "最高" },
      { task: "TikTok/Instagram本部公式アカウントの運用開始", impact: "高", urgency: "高" },
      { task: "Lステップ「友だち招待」自動シナリオ設計", impact: "高", urgency: "高" },
      { task: "食べログ/ぐるなび全店ページの写真・情報更新", impact: "中", urgency: "高" },
    ],
  },
  {
    category: "集客施策（即実施）",
    color: C.yellow,
    tasks: [
      { task: "「月次新規LINE友達数」を全店KPI #1 として管理開始", impact: "最高", urgency: "最高" },
      { task: "店頭POP・のぼり・外待ち整備ツールキットの本部制作・配布", impact: "中", urgency: "高" },
      { task: "Google口コミ促進QRカード（本部制作）を全店配布", impact: "高", urgency: "最高" },
      { task: "月1回の「新規集客施策」全店共有会（成功事例横展開）", impact: "高", urgency: "高" },
    ],
  },
];

const roadmap = [
  {
    phase: "Phase 1",
    period: "〜1ヶ月",
    theme: "計測基盤の構築",
    color: C.yellow,
    actions: [
      "全店のGBP（Googleビジネスプロフィール）管理権を本部に集約",
      "月次KPI：新規LINE友達数・時間あたり杯数・初回再訪率を全店から収集開始",
      "Google口コミ促進QRカードを本部制作・全店配布",
      "TikTok/Instagram本部アカウント開設（週2〜3投稿開始）",
    ],
  },
  {
    phase: "Phase 2",
    period: "1〜3ヶ月",
    theme: "デジタル集客の立ち上げ",
    color: C.orange,
    actions: [
      "GBP：全店の写真を高品質に刷新、毎週投稿を本部が実施（「ラーメン ◯◯」検索で上位表示狙い）",
      "SNS：店舗から素材を集めTikTok/Reelsで月8本制作・投稿。マシマシビジュアル・コール動画が強い",
      "LINE：「友だち招待で50円引き」キャンペーン設計・全店同時展開",
      "食べログ：全店写真更新＋「二郎系ランキング」上位を狙うレビュー促進施策",
    ],
  },
  {
    phase: "Phase 3",
    period: "3〜6ヶ月",
    theme: "口コミエンジンの設計",
    color: C.red,
    actions: [
      "「口コミ化する体験」の接客マニュアルを成功店（弘前・大久保）から抽出・全店横展開",
      "インフルエンサー（食系YouTuber・TikToker）招待プログラムの本部主導実施",
      "Googleマップ評価数の店舗間ランキングを可視化し競争意識を醸成",
      "SNSで「バズった施策」の成功パターンをプレイブック化",
    ],
  },
  {
    phase: "Phase 4",
    period: "6ヶ月〜",
    theme: "仕組みのスケール化",
    color: "#a78bfa",
    actions: [
      "「新規客獲得コスト（CPA）」を各チャネルごとに計測・最適化",
      "新規出店時の集客マニュアルを標準化（オープン前1ヶ月からのSNS告知等）",
      "本部横断のコンテンツチーム（または外注代理店）の構築",
      "季節性対策：冬季限定メニュー×SNSキャンペーンを毎年テンプレート化",
    ],
  },
];

const kpiTree = {
  root: { label: "月次全店売上", color: C.red },
  l1: [
    { label: "総来客数（cups/h × 営業時間）", color: C.orange },
    { label: "客単価", color: C.yellow },
  ],
  l2_left: [
    { label: "新規客数", color: "#36d399", key: "new" },
    { label: "リピーター数", color: C.muted, key: "repeat" },
  ],
  l3_new: [
    { label: "🏆 新規LINE友達数/月", color: "#36d399", star: true },
    { label: "Google口コミ数・評価点", color: "#36d399", star: true },
    { label: "GBP検索表示回数", color: "#36d399" },
    { label: "SNSリーチ数・保存数", color: "#36d399" },
    { label: "来店きっかけ：SNS比率", color: "#36d399" },
  ],
};

export default function Strategy() {
  const [activeSection, setActiveSection] = useState("equation");
  const [activeChannel, setActiveChannel] = useState(0);

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      color: C.text,
      fontFamily: "'Noto Sans JP', 'Georgia', serif",
    }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(180deg, #100608 0%, ${C.bg} 100%)`,
        borderBottom: `1px solid ${C.border}`,
        padding: "28px 36px 0",
      }}>
        <div style={{
          display: "inline-block",
          background: C.red,
          color: "#fff",
          fontSize: 10,
          fontWeight: 900,
          letterSpacing: "0.25em",
          padding: "4px 12px",
          marginBottom: 12,
        }}>
          HQ STRATEGY PLAYBOOK
        </div>
        <h1 style={{
          margin: "0 0 8px",
          fontSize: 28,
          fontWeight: 900,
          color: C.white,
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
        }}>
          新規客獲得戦略<br />
          <span style={{ color: C.red, fontSize: 20 }}>因数分解 & 本部実行プラン</span>
        </h1>
        <p style={{ margin: "0 0 24px", fontSize: 13, color: C.muted, maxWidth: 560 }}>
          「限界を超えろ」6店舗のデータが証明したセンターピン：<br/>
          <strong style={{ color: C.yellow }}>新規客獲得量</strong>こそが売上を決める。本部がやるべきことを完全因数分解。
        </p>
        {/* Nav */}
        <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
              background: "none",
              border: "none",
              borderBottom: activeSection === s.id ? `3px solid ${C.red}` : "3px solid transparent",
              color: activeSection === s.id ? C.white : C.muted,
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: activeSection === s.id ? 800 : 400,
              whiteSpace: "nowrap",
              letterSpacing: "0.05em",
              transition: "color 0.15s",
            }}>
              <span style={{ marginRight: 6, fontSize: 14 }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "32px 36px", maxWidth: 1280, margin: "0 auto" }}>

        {/* ===== EQUATION ===== */}
        {activeSection === "equation" && (
          <div>
            {/* Core formula */}
            <div style={{
              border: `1px solid ${C.red}`,
              borderLeft: `6px solid ${C.red}`,
              borderRadius: 4,
              padding: "28px 32px",
              marginBottom: 28,
              background: "#0e0608",
            }}>
              <div style={{ fontSize: 11, color: C.red, letterSpacing: "0.2em", marginBottom: 12 }}>新規集客の根本方程式</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: C.white, lineHeight: 1.6, fontFamily: "monospace" }}>
                月次新規客数<br/>
                <span style={{ color: C.muted, fontSize: 16 }}>＝</span><br/>
                <span style={{ color: C.yellow }}>市場認知人数</span>
                <span style={{ color: C.muted, fontSize: 16 }}> × </span>
                <span style={{ color: C.orange }}>来店転換率</span>
                <span style={{ color: C.muted, fontSize: 16 }}> × </span>
                <span style={{ color: C.red }}>初回再訪率</span>
              </div>
              <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  { label: "市場認知人数", color: C.yellow, desc: "「このラーメン店の存在を知っている人」の絶対数。SNS・Googleマップ・口コミ・看板が増やす。本部の仕事。" },
                  { label: "来店転換率", color: C.orange, desc: "「知っている→実際に来店する」率。ハードル（入りにくい・わからない・高い）を下げることで上がる。本部×店舗。" },
                  { label: "初回再訪率", color: C.red, desc: "「1回来た人が2回目も来る」率。これが低いと新規をいくら獲得しても「ザル」になる。店舗の仕事。" },
                ].map(item => (
                  <div key={item.label} style={{ background: "#0a0a0c", border: `1px solid ${C.border}`, borderTop: `3px solid ${item.color}`, borderRadius: 4, padding: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 8 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Breakdown per factor */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 4, padding: 24 }}>
                <div style={{ fontSize: 11, color: C.yellow, letterSpacing: "0.15em", fontWeight: 700, marginBottom: 12 }}>
                  「市場認知人数」をさらに分解する
                </div>
                {[
                  { label: "エリア人口", val: "定数（変えられない）", color: C.muted },
                  { label: "× SNSリーチ率", val: "本部が伸ばせる", color: C.yellow },
                  { label: "× Googleマップ表示率", val: "本部が伸ばせる", color: C.yellow },
                  { label: "× 口コミ伝達率", val: "店舗接客 × 本部設計", color: C.orange },
                  { label: "× 食べログ・メディア露出", val: "本部が伸ばせる", color: C.yellow },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.border}`, padding: "10px 0", fontSize: 13 }}>
                    <span style={{ color: C.text }}>{item.label}</span>
                    <span style={{ color: item.color, fontSize: 11, fontWeight: 700 }}>{item.val}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 4, padding: 24 }}>
                <div style={{ fontSize: 11, color: C.orange, letterSpacing: "0.15em", fontWeight: 700, marginBottom: 12 }}>
                  「来店転換率」をさらに分解する
                </div>
                {[
                  { label: "× 店舗の入りやすさ（雰囲気）", val: "本部×店舗", color: C.orange },
                  { label: "× システム理解のしやすさ", val: "本部設計（マニュアル）", color: C.yellow },
                  { label: "× 待ち時間の許容度", val: "オペレーション改善", color: C.orange },
                  { label: "× 価格納得感", val: "価値提供（本部戦略）", color: C.orange },
                  { label: "× 立地アクセス性", val: "出店戦略（本部）", color: C.yellow },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.border}`, padding: "10px 0", fontSize: 13 }}>
                    <span style={{ color: C.text }}>{item.label}</span>
                    <span style={{ color: item.color, fontSize: 11, fontWeight: 700 }}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key insight box */}
            <div style={{
              background: "#0a0c0a",
              border: `1px solid #36d399`,
              borderRadius: 4,
              padding: "20px 28px",
            }}>
              <div style={{ fontSize: 11, color: "#36d399", fontWeight: 700, marginBottom: 10 }}>📌 重要な構造的インサイト</div>
              <div style={{ fontSize: 14, color: C.text, lineHeight: 1.9 }}>
                <strong style={{ color: "#36d399" }}>本部がコントロールできるレバーは「市場認知人数」と「来店転換率」の大部分。</strong>
                つまり<strong>「そもそも知ってもらう」「来てみようと思わせる」</strong>が本部の核心業務。<br/>
                「来てみたら最高だった」の体験は店舗が作るが、<strong>「来るきっかけ」を設計するのは本部</strong>だという役割分担が明確になる。<br/>
                データが示す通り、弘前は口コミ64.6%でバズる素材を持っているのに、それをSNSで全国に届ける本部機能が不在だったため新規客が減少した。
              </div>
            </div>
          </div>
        )}

        {/* ===== CHANNELS ===== */}
        {activeSection === "channels" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              {channelData.map((ch, i) => (
                <button key={i} onClick={() => setActiveChannel(i)} style={{
                  background: activeChannel === i ? ch.color : "transparent",
                  color: activeChannel === i ? "#000" : ch.color,
                  border: `1.5px solid ${ch.color}`,
                  borderRadius: 4,
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 700,
                  transition: "all 0.15s",
                }}>
                  {ch.icon} {ch.name}
                </button>
              ))}
            </div>

            {/* Channel detail */}
            {(() => {
              const ch = channelData[activeChannel];
              return (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20, marginBottom: 20 }}>
                    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `4px solid ${ch.color}`, borderRadius: 4, padding: 24 }}>
                      <div style={{ fontSize: 32, marginBottom: 12 }}>{ch.icon}</div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: ch.color, marginBottom: 16 }}>{ch.name}</div>
                      {[
                        { label: "現在のチャネルシェア", value: ch.share },
                        { label: "主担当", value: ch.who },
                        { label: "伸ばしやすさ", value: ch.lever },
                        { label: "効果が出るまで", value: ch.speed },
                        { label: "コスト感", value: ch.cost },
                      ].map(item => (
                        <div key={item.label} style={{ borderBottom: `1px solid ${C.border}`, padding: "10px 0", display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 11, color: C.muted }}>{item.label}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: C.white }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 4, padding: 24, marginBottom: 16 }}>
                        <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>チャネル概要</div>
                        <div style={{ fontSize: 14, color: C.text, lineHeight: 1.9 }}>{ch.desc}</div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div style={{ background: "#0a100a", border: `1px solid ${ch.color}44`, borderRadius: 4, padding: 20 }}>
                          <div style={{ fontSize: 11, color: ch.color, fontWeight: 700, marginBottom: 10 }}>🏢 本部がやること</div>
                          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8 }}>{ch.hq_action}</div>
                        </div>
                        <div style={{ background: "#0a0c10", border: `1px solid ${C.border}`, borderRadius: 4, padding: 20 }}>
                          <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 10 }}>🏪 店舗がやること</div>
                          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8 }}>{ch.store_action}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Priority matrix for all channels */}
                  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 4, padding: 24 }}>
                    <div style={{ fontSize: 11, color: C.yellow, fontWeight: 700, marginBottom: 16 }}>全チャネル 優先度マトリクス（本部視点）</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3, position: "relative" }}>
                      {/* Y axis */}
                      <div style={{ gridColumn: "1/-1", display: "grid", gridTemplateColumns: "60px 1fr 1fr 1fr", gap: 3, marginBottom: 3 }}>
                        <div />
                        <div style={{ textAlign: "center", fontSize: 10, color: C.muted }}>コスト：低</div>
                        <div style={{ textAlign: "center", fontSize: 10, color: C.muted }}>コスト：中</div>
                        <div style={{ textAlign: "center", fontSize: 10, color: C.muted }}>コスト：高</div>
                      </div>
                      {[
                        { speed: "即効性", items: [["Google口コミQR配布", C.red, true], ["LINEキャンペーン", "#22c55e", true], ["インフル招待", C.orange, false]] },
                        { speed: "中期", items: [["MEO（GBP最適化）", C.red, true], ["SNS運用（TikTok等）", C.orange, true], ["食べログ強化", C.muted, false]] },
                        { speed: "長期", items: [["口コミマニュアル横展開", C.yellow, false], ["ブランディング統一", C.yellow, false], ["出店戦略", C.muted, false]] },
                      ].map((row, ri) => (
                        <div key={ri} style={{ gridColumn: "1/-1", display: "grid", gridTemplateColumns: "60px 1fr 1fr 1fr", gap: 3 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: C.muted }}>{row.speed}</div>
                          {row.items.map(([name, color, recommended], ci) => (
                            <div key={ci} style={{
                              background: recommended ? `${color}18` : "#0a0a0c",
                              border: `1px solid ${recommended ? color + "44" : C.border}`,
                              borderRadius: 4,
                              padding: "10px 12px",
                              fontSize: 12,
                              color: recommended ? color : C.muted,
                              fontWeight: recommended ? 700 : 400,
                            }}>
                              {recommended && <span style={{ marginRight: 4 }}>★</span>}
                              {name}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ===== HQ VS STORE ===== */}
        {activeSection === "hq_vs_store" && (
          <div>
            <div style={{ marginBottom: 24, padding: "16px 20px", background: "#0a0c10", border: `1px solid ${C.border}`, borderRadius: 4 }}>
              <div style={{ fontSize: 13, color: C.text, lineHeight: 1.9 }}>
                <strong style={{ color: C.yellow }}>大原則：</strong>
                「面（エリア・Web）から人を引っ張ってくる仕事＝本部」「点（来店体験）で心を掴む仕事＝店舗」。
                本部が集客の仕組みを作り、店舗が転換率と再訪率を高める。この分担が崩れると双方が中途半端になる。
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {/* HQ */}
              <div>
                <div style={{ borderLeft: `4px solid ${C.red}`, paddingLeft: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: 11, color: C.red, letterSpacing: "0.15em", fontWeight: 700 }}>本部（HQ）の仕事</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: C.white, marginTop: 4 }}>「知ってもらう」「来てみようと思わせる」</div>
                </div>
                {hqResponsibilities.map((cat, ci) => (
                  <div key={ci} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 4, padding: 20, marginBottom: 16 }}>
                    <div style={{ fontSize: 11, color: cat.color, fontWeight: 700, marginBottom: 12 }}>{cat.category}</div>
                    {cat.tasks.map((task, ti) => (
                      <div key={ti} style={{ borderBottom: `1px solid ${C.border}`, padding: "10px 0", display: "grid", gridTemplateColumns: "1fr auto auto" }}>
                        <span style={{ fontSize: 13, color: C.text }}>{task.task}</span>
                        <span style={{ fontSize: 10, marginLeft: 8, padding: "2px 6px", background: task.impact === "最高" ? C.red + "33" : task.impact === "高" ? C.orange + "33" : C.muted + "33", color: task.impact === "最高" ? C.red : task.impact === "高" ? C.orange : C.muted, borderRadius: 2 }}>
                          影響{task.impact}
                        </span>
                        <span style={{ fontSize: 10, marginLeft: 6, padding: "2px 6px", background: task.urgency === "最高" ? C.red + "22" : C.border, color: task.urgency === "最高" ? C.red : C.muted, borderRadius: 2 }}>
                          {task.urgency}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Store */}
              <div>
                <div style={{ borderLeft: `4px solid ${C.yellow}`, paddingLeft: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: 11, color: C.yellow, letterSpacing: "0.15em", fontWeight: 700 }}>店舗の仕事</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: C.white, marginTop: 4 }}>「来た人を口コミ化させる体験を作る」</div>
                </div>

                {[
                  {
                    category: "新規来店転換率の最大化",
                    color: C.yellow,
                    items: [
                      "「初めての方へ」案内をわかりやすく整備（券売機・コール・システム説明）",
                      "外待ち中の「説明スタッフ」配置で離脱防止",
                      "女性・カップルが入りやすい雰囲気の維持（照明・清潔感）",
                    ],
                  },
                  {
                    category: "初回再訪率の最大化",
                    color: C.orange,
                    items: [
                      "来店時のLINE登録誘導（QR常設・口頭案内必須）",
                      "「顔を覚える」「名前で呼ぶ」接客でリピート動機を作る",
                      "完食コール・グッジョブなど「話したくなる体験」の徹底",
                    ],
                  },
                  {
                    category: "口コミ化促進",
                    color: C.red,
                    items: [
                      "SNS投稿を促す「映えスポット」を店内に意識的に設ける",
                      "「ラーメン来た瞬間」の写真・動画素材を本部に毎週送る",
                      "Google口コミ投稿QRを会計後に必ず案内する",
                    ],
                  },
                ].map((cat, ci) => (
                  <div key={ci} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 4, padding: 20, marginBottom: 16 }}>
                    <div style={{ fontSize: 11, color: cat.color, fontWeight: 700, marginBottom: 12 }}>{cat.category}</div>
                    {cat.items.map((item, ii) => (
                      <div key={ii} style={{ borderBottom: `1px solid ${C.border}`, padding: "10px 0", fontSize: 13, color: C.text, display: "flex", gap: 8 }}>
                        <span style={{ color: cat.color, minWidth: 12 }}>→</span>
                        {item}
                      </div>
                    ))}
                  </div>
                ))}

                <div style={{ background: "#0e0a06", border: `1px solid ${C.yellow}44`, borderRadius: 4, padding: 20 }}>
                  <div style={{ fontSize: 11, color: C.yellow, fontWeight: 700, marginBottom: 10 }}>⚠️ 店舗がやってはいけないこと</div>
                  {[
                    "集客施策を自己流でバラバラに実施（ブランド毀損リスク）",
                    "SNS投稿を店舗単独アカウントで行い、本部と競合させる",
                    "Google口コミへの返信を放置する（本部が対応）",
                  ].map((item, i) => (
                    <div key={i} style={{ fontSize: 12, color: C.muted, padding: "6px 0", display: "flex", gap: 8 }}>
                      <span style={{ color: C.red }}>✕</span>{item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== TACTICS ROADMAP ===== */}
        {activeSection === "tactics" && (
          <div>
            <div style={{ marginBottom: 28, padding: "20px 24px", background: "#0e0608", border: `1px solid ${C.red}44`, borderRadius: 4 }}>
              <div style={{ fontSize: 13, color: C.text, lineHeight: 1.9 }}>
                <strong style={{ color: C.red }}>ロードマップの設計思想：</strong>
                いきなりSNS投稿を増やしても効果は薄い。まず「計測できる状態を作る」→「効果が出やすいチャネルから着手」→「成功パターンを横展開」という順序が鉄則。
                最速で成果が出るのは<strong style={{ color: C.yellow }}>MEO（Googleマップ最適化）</strong>と<strong style={{ color: C.yellow }}>Google口コミ促進</strong>。津田沼が20.9%を実現しているのに、他店が8〜12%のままなのは「やっていないから」に過ぎない。
              </div>
            </div>

            {roadmap.map((phase, pi) => (
              <div key={pi} style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gap: 0,
                marginBottom: 4,
                borderRadius: pi === 0 ? "4px 4px 0 0" : pi === roadmap.length - 1 ? "0 0 4px 4px" : 0,
                overflow: "hidden",
                border: `1px solid ${C.border}`,
              }}>
                <div style={{
                  background: `${phase.color}18`,
                  borderRight: `1px solid ${C.border}`,
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}>
                  <div style={{ fontSize: 11, color: phase.color, fontWeight: 900, letterSpacing: "0.1em", marginBottom: 4 }}>{phase.phase}</div>
                  <div style={{ fontSize: 13, color: C.white, fontWeight: 800, marginBottom: 4 }}>{phase.period}</div>
                  <div style={{ fontSize: 12, color: phase.color }}>{phase.theme}</div>
                </div>
                <div style={{ background: C.card, padding: "20px 24px" }}>
                  {phase.actions.map((action, ai) => (
                    <div key={ai} style={{
                      display: "flex",
                      gap: 12,
                      padding: "10px 0",
                      borderBottom: ai < phase.actions.length - 1 ? `1px solid ${C.border}` : "none",
                      fontSize: 13,
                      color: C.text,
                      lineHeight: 1.6,
                    }}>
                      <span style={{
                        minWidth: 20,
                        height: 20,
                        background: phase.color,
                        color: "#000",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        fontWeight: 900,
                        flexShrink: 0,
                        marginTop: 2,
                      }}>{ai + 1}</span>
                      {action}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Deep dive: MEO */}
            <div style={{ marginTop: 28, background: C.card, border: `1px solid ${C.red}`, borderRadius: 4, padding: 28 }}>
              <div style={{ fontSize: 11, color: C.red, fontWeight: 700, letterSpacing: "0.15em", marginBottom: 12 }}>
                🔥 最速で効く施策：MEO（Googleマップ最適化）の具体的やり方
              </div>
              <p style={{ fontSize: 13, color: C.text, lineHeight: 1.8, marginBottom: 16 }}>
                「二郎系 新潟」「ラーメン 弘前 おすすめ」などのキーワードで検索されたとき、Googleマップの上位に表示されるかどうかを決める施策。
                津田沼の成功は偶然ではなく、GBPが最適化されているから。これを全店で再現するだけで新規来客数が+15〜30%増える可能性がある。
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { title: "即実施（1週間）", color: C.red, items: ["営業時間・住所・電話番号の最新化", "高品質写真（料理・外観・内観）を各10枚以上追加", "「特別な提供方法」「メニュー」の記入充実"] },
                  { title: "継続実施（毎週）", color: C.orange, items: ["GBPへの投稿（新メニュー・イベント・限定など）", "Google口コミへの返信（24時間以内・本部が対応）", "「最新情報」投稿で検索順位維持"] },
                  { title: "口コミ数を増やす（毎日）", color: C.yellow, items: ["会計後のQRカード（「30秒で書けます」と一言）", "LINE配信で「口コミ投稿お願い」月1回", "投稿してくれた方への口頭感謝（スタッフ全員）"] },
                ].map((col, ci) => (
                  <div key={ci} style={{ background: "#0a0a0c", border: `1px solid ${col.color}33`, borderRadius: 4, padding: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: col.color, marginBottom: 10 }}>{col.title}</div>
                    {col.items.map((item, ii) => (
                      <div key={ii} style={{ fontSize: 12, color: C.text, padding: "6px 0", borderBottom: `1px solid ${C.border}`, lineHeight: 1.6 }}>
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Deep dive: SNS */}
            <div style={{ marginTop: 16, background: C.card, border: `1px solid ${C.orange}`, borderRadius: 4, padding: 28 }}>
              <div style={{ fontSize: 11, color: C.orange, fontWeight: 700, letterSpacing: "0.15em", marginBottom: 12 }}>
                📱 SNS戦略：二郎系は「バズりやすいコンテンツ」が揃っている
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { title: "バズりやすいコンテンツ（本部が制作）", items: [
                    "🍜 マシマシの山盛りビジュアル（TikTok・Reels必須）",
                    "🎤 コール動画（グッジョブ！の瞬間）",
                    "👨‍🍳 店員さんのキャラクター紹介",
                    "📊 「初めての方向け完全ガイド」解説動画",
                    "🔥 限定メニュー解禁日のカウントダウン投稿",
                  ]},
                  { title: "コンテンツ収集の仕組み（本部主導）", items: [
                    "各店舗LINEグループへ「今日の写真ください」を毎日依頼",
                    "月1回の「映え研修」で各店に素材づくりの型を教える",
                    "バズった投稿は全店にすぐ共有（成功パターンの横展開）",
                    "フードインフルエンサーのリスト化と定期招待（本部予算化）",
                    "UGC（お客様投稿）の許可取りと公式転載で運用コスト削減",
                  ]},
                ].map((col, ci) => (
                  <div key={ci} style={{ background: "#0a0a0c", borderRadius: 4, padding: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.orange, marginBottom: 10 }}>{col.title}</div>
                    {col.items.map((item, ii) => (
                      <div key={ii} style={{ fontSize: 12, color: C.text, padding: "6px 0", borderBottom: `1px solid ${C.border}`, lineHeight: 1.6 }}>{item}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== KPI ===== */}
        {activeSection === "kpi" && (
          <div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 4, padding: 28, marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: C.yellow, fontWeight: 700, marginBottom: 16 }}>KPIツリー：売上から新規集客指標へのブレイクダウン</div>
              
              {/* Tree visualization */}
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                {/* Root */}
                <div style={{ display: "inline-block", background: C.red + "22", border: `2px solid ${C.red}`, borderRadius: 4, padding: "10px 28px", fontSize: 15, fontWeight: 900, color: C.red, marginBottom: 16 }}>
                  月次全店売上（最終KPI）
                </div>
                
                <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 16 }}>
                  {[["総来客数（cups/h × 時間）", C.orange], ["客単価", C.yellow]].map(([label, color]) => (
                    <div key={label} style={{ background: color + "18", border: `1px solid ${color}`, borderRadius: 4, padding: "8px 20px", fontSize: 13, fontWeight: 700, color, margin: "0 8px" }}>{label}</div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 16 }}>
                  {[["新規客数 ←ここが本質", "#36d399", true], ["リピーター数", C.muted, false]].map(([label, color, star]) => (
                    <div key={label} style={{ background: color + "18", border: `${star ? 2 : 1}px solid ${color}`, borderRadius: 4, padding: "8px 20px", fontSize: 13, fontWeight: star ? 900 : 400, color, margin: "0 8px" }}>
                      {star && "⭐ "}{label}
                    </div>
                  ))}
                </div>

                {/* Lead indicators */}
                <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                  {[
                    ["🏆 新規LINE友達数/月", C.red, true],
                    ["🏆 GBP表示回数・クリック数", C.red, true],
                    ["Google口コミ数・平均評価", "#36d399", false],
                    ["SNSリーチ・保存数", C.orange, false],
                    ["来店きっかけSNS比率", C.orange, false],
                    ["初回再訪率", C.yellow, false],
                  ].map(([label, color, star]) => (
                    <div key={label} style={{ background: color + "15", border: `1px solid ${color}44`, borderRadius: 4, padding: "6px 14px", fontSize: 11, color, fontWeight: star ? 700 : 400 }}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* KPI Table */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 4, overflow: "hidden", marginBottom: 20 }}>
              <div style={{ padding: "16px 24px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, color: C.yellow, fontWeight: 700 }}>本部管理KPI一覧（全店月次レポートに含める指標）</div>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: C.dim }}>
                    {["KPI", "計測方法", "頻度", "目標基準", "担当"].map(h => (
                      <th key={h} style={{ padding: "10px 16px", fontSize: 11, color: C.muted, textAlign: "left", fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["🏆 新規LINE友達数", "Lステップ管理画面", "月次", "前月比-20%を超えたら即施策発動", "本部"],
                    ["GBP検索表示回数", "Googleビジネスプロフィール", "月次", "前月比維持〜+10%", "本部"],
                    ["GBPからのクリック数（来店）", "GBP管理画面", "月次", "表示に対するCTR 5%以上", "本部"],
                    ["Google口コミ数（月次新着）", "GBP管理画面", "月次", "各店月10件以上", "本部・店舗"],
                    ["Google口コミ平均評価", "GBP管理画面", "月次", "全店4.0以上維持", "本部・店舗"],
                    ["SNS（TikTok/IG）インプレッション", "SNS管理ツール", "週次", "月間目標リーチ数設定", "本部"],
                    ["時間あたり杯数（cups/h）", "売上管理シート", "月次", "前月比±5%以内", "店舗→本部報告"],
                    ["来店きっかけ別比率（LINE月次）", "LINEレポート", "月次", "口コミ比率の維持・SNS比率向上", "本部集計"],
                    ["初回再訪率（2回目来店率）", "Lステップ", "月次", "全店20%以上", "本部"],
                  ].map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: `1px solid ${C.border}`, background: ri % 2 === 0 ? "transparent" : "#0a0a0e" }}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{ padding: "10px 16px", fontSize: 12, color: ci === 0 ? C.text : C.muted }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Warning system */}
            <div style={{ background: "#0e0608", border: `1px solid ${C.red}`, borderRadius: 4, padding: 24 }}>
              <div style={{ fontSize: 11, color: C.red, fontWeight: 700, marginBottom: 16 }}>🚨 アラートシステム：これが起きたら即座に動く</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  { trigger: "新規LINE友達数が前月比-20%以下", action: "SNS投稿頻度2倍・LINE友達招待キャンペーン即発動", color: C.red },
                  { trigger: "cups/hが2ヶ月連続で前月比-5%以下", action: "店舗訪問・オペレーション確認・MEO緊急チェック", color: C.red },
                  { trigger: "Google口コミ平均が3.8を下回る", action: "ネガレビューの原因特定・本部直接対応・改善指示", color: C.orange },
                  { trigger: "GBPクリック数が前月比-15%以下", action: "GBP写真更新・投稿頻度上げ・キーワード見直し", color: C.orange },
                  { trigger: "初回再訪率が15%を下回る", action: "初来店体験の問題特定・LINE自動シナリオ見直し", color: C.yellow },
                  { trigger: "SNSエンゲージメントが2週間0件", action: "コンテンツ戦略の見直し・インフルエンサー施策発動", color: C.yellow },
                ].map((alert, ai) => (
                  <div key={ai} style={{ background: alert.color + "10", border: `1px solid ${alert.color}33`, borderRadius: 4, padding: 16 }}>
                    <div style={{ fontSize: 11, color: alert.color, fontWeight: 700, marginBottom: 8 }}>トリガー条件</div>
                    <div style={{ fontSize: 12, color: C.text, marginBottom: 12, lineHeight: 1.6 }}>{alert.trigger}</div>
                    <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 6 }}>→ アクション</div>
                    <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{alert.action}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
