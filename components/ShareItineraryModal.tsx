import React, { useState } from 'react';
import {
  X,
  Share2,
  Download,
  Printer,
  Copy,
  Check,
  MessageCircle,
  Mail,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Camera,
  Utensils,
  Users,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { TourPackage } from '../types';

interface ShareItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: TourPackage;
}

const wrapCanvasText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 10
): number => {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  let linesDrawn = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      linesDrawn++;
      if (linesDrawn >= maxLines) {
        ctx.fillText(line.trim() + '...', x, currentY);
        return currentY + lineHeight;
      }
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line.trim()) {
    ctx.fillText(line.trim(), x, currentY);
    currentY += lineHeight;
  }
  return currentY;
};

const loadImageSafe = (url: string): Promise<HTMLImageElement | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
};

export const buildFullItineraryText = (tour: TourPackage, pageUrl: string): string => {
  const lines: string[] = [
    `🦁 *EMBUAT SAFARIS — OFFICIAL EXPEDITION ITINERARY*`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `📌 *${tour.name.toUpperCase()}*`,
    `⏱ *Duration:* ${tour.duration} | *Category:* ${tour.category}`,
    `💰 *Starting Price:* $${tour.fromPrice.toLocaleString()} USD per person`,
    `📍 *Location:* ${tour.location || 'Tanzania Wildlife Sanctuaries'}`,
    `🖼 *Cover Photo:* ${tour.coverImage || tour.image}`,
    ``,
    `✨ *KEY HIGHLIGHTS:*`,
    ...tour.highlights.map(h => `  • ${h}`),
    ``,
    `🗓 *COMPLETE DAY-BY-DAY ITINERARY:*`
  ];

  tour.itinerary.forEach((day) => {
    lines.push(
      ``,
      `*Day ${day.day}: ${day.title}*`,
      `${day.activities}`,
      `🏕 *Lodge / Camp:* ${day.accommodation}`,
      `🍽 *Meals:* ${day.meals}`
    );
  });

  lines.push(
    ``,
    `✅ *WHAT'S INCLUDED:*`,
    ...tour.included.map(i => `  ✓ ${i}`),
    ``,
    `❌ *NOT INCLUDED:*`,
    ...tour.notIncluded.map(i => `  • ${i}`),
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `📞 *Call / WhatsApp:* +255 785 341 091`,
    `✉️ *Email:* gabrielzablon6@gmail.com`,
    `📍 *HQ:* Monduli Juu, Tanzania (-3.14150, 36.43046)`,
    `🔗 *View Full Illustrated Itinerary:* ${pageUrl}`
  );

  return lines.join('\n');
};

const ShareItineraryModal: React.FC<ShareItineraryModalProps> = ({ isOpen, onClose, tour }) => {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const fullText = buildFullItineraryText(tour, pageUrl);

  // Dynamically generate a high-res illustrated itinerary poster PNG
  const generateItineraryImageBlob = async (): Promise<Blob | null> => {
    const width = 1080;
    const baseHeight = 980 + tour.itinerary.length * 195 + Math.ceil(tour.highlights.length / 2) * 42;
    const height = Math.max(1450, Math.min(3600, baseHeight));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#F97316';
    ctx.fillRect(0, 0, width, 14);

    const [coverImg, logoImg] = await Promise.all([
      loadImageSafe(tour.coverImage || tour.image),
      loadImageSafe('/embuat-safaris-logo.jpg')
    ]);

    const heroHeight = 420;
    if (coverImg) {
      ctx.save();
      const scale = Math.max(width / coverImg.width, heroHeight / coverImg.height);
      const sw = coverImg.width * scale;
      const sh = coverImg.height * scale;
      ctx.drawImage(coverImg, (width - sw) / 2, 14 + (heroHeight - sh) / 2, sw, sh);
      ctx.restore();
    } else {
      const grad = ctx.createLinearGradient(0, 14, width, heroHeight);
      grad.addColorStop(0, '#1F1209');
      grad.addColorStop(1, '#0A0A0A');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 14, width, heroHeight);
    }

    const overlayGrad = ctx.createLinearGradient(0, 14, 0, 14 + heroHeight);
    overlayGrad.addColorStop(0, 'rgba(0,0,0,0.45)');
    overlayGrad.addColorStop(0.6, 'rgba(0,0,0,0.65)');
    overlayGrad.addColorStop(1, '#0A0A0A');
    ctx.fillStyle = overlayGrad;
    ctx.fillRect(0, 14, width, heroHeight);

    if (logoImg) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(88, 86, 46, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = '#F3EFE4';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#F97316';
      ctx.stroke();
      ctx.clip();
      ctx.drawImage(logoImg, 42, 40, 92, 92);
      ctx.restore();
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 26px Georgia, serif';
    ctx.fillText('EMBUAT SAFARIS', 150, 78);
    ctx.fillStyle = '#F97316';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('OFFICIAL ILLUSTRATED EXPEDITION ITINERARY • MONDULI JUU, TANZANIA', 150, 104);

    ctx.fillStyle = '#F97316';
    ctx.beginPath();
    ctx.roundRect(48, 250, 260, 38, 19);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`${tour.duration.toUpperCase()} • ${tour.category.toUpperCase()}`, 66, 275);

    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.strokeStyle = '#F97316';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(width - 290, 230, 242, 86, 18);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#F97316';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('STARTING FROM', width - 268, 258);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText(`$${tour.fromPrice.toLocaleString()} / pp`, width - 268, 296);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 38px Georgia, serif';
    wrapCanvasText(ctx, tour.name, 48, 338, width - 360, 44, 2);

    let y = 450;

    ctx.fillStyle = '#141414';
    ctx.strokeStyle = 'rgba(249,115,22,0.35)';
    ctx.lineWidth = 1.5;
    const hlHeight = 70 + Math.ceil(tour.highlights.length / 2) * 34;
    ctx.beginPath();
    ctx.roundRect(48, y, width - 96, hlHeight, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#F97316';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('EXPEDITION HIGHLIGHTS', 72, y + 34);

    ctx.font = '15px sans-serif';
    tour.highlights.forEach((h, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const hx = col === 0 ? 72 : width / 2 + 12;
      const hy = y + 66 + row * 32;
      ctx.fillStyle = '#F97316';
      ctx.fillText('✓', hx, hy);
      ctx.fillStyle = '#E5E5E5';
      const clipped = h.length > 48 ? h.slice(0, 46) + '...' : h;
      ctx.fillText(clipped, hx + 20, hy);
    });

    y += hlHeight + 36;

    ctx.fillStyle = '#F97316';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('COMPLETE DAY-BY-DAY ITINERARY', 48, y);
    y += 22;

    for (const day of tour.itinerary) {
      if (y > height - 240) break;

      ctx.fillStyle = '#141414';
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(48, y, width - 96, 165, 18);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#F97316';
      ctx.beginPath();
      ctx.roundRect(68, y + 20, 74, 34, 10);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(`DAY ${day.day}`, 80, y + 42);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px Georgia, serif';
      ctx.fillText(day.title.length > 62 ? day.title.slice(0, 60) + '...' : day.title, 158, y + 43);

      ctx.fillStyle = '#CCCCCC';
      ctx.font = '15px sans-serif';
      wrapCanvasText(ctx, day.activities, 68, y + 76, width - 136, 22, 2);

      ctx.fillStyle = '#F97316';
      ctx.font = 'bold 14px sans-serif';
      const footerInfo = `🏕 Lodge/Camp: ${day.accommodation}    •    🍽 Meals: ${day.meals}`;
      ctx.fillText(footerInfo.length > 95 ? footerInfo.slice(0, 92) + '...' : footerInfo, 68, y + 144);

      y += 182;
    }

    const footerY = height - 110;
    ctx.fillStyle = '#F97316';
    ctx.fillRect(0, footerY, width, 110);

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('EMBUAT SAFARIS • MONDULI JUU, ARUSHA, TANZANIA', 48, footerY + 42);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 17px sans-serif';
    ctx.fillText('Call / WhatsApp: +255 785 341 091   |   Email: gabrielzablon6@gmail.com   |   100% Private 4x4 Safaris', 48, footerY + 76);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png', 0.95);
    });
  };

  // Native Share with Image File + Full Itinerary Text
  const handleNativeShareWithPictures = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateItineraryImageBlob();
      const fileName = `${tour.id}-embuat-itinerary.png`;

      if (blob && navigator.share) {
        const file = new File([blob], fileName, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `${tour.name} — Embuat Safaris Itinerary`,
            text: fullText,
            files: [file]
          });
          setIsGenerating(false);
          return;
        }
      }

      if (navigator.share) {
        await navigator.share({
          title: `${tour.name} — Embuat Safaris Itinerary`,
          text: fullText,
          url: pageUrl
        });
      } else {
        await navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch {
      // User cancelled or share failed
    } finally {
      setIsGenerating(false);
    }
  };

  // Download Illustrated PNG Poster
  const handleDownloadPoster = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateItineraryImageBlob();
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${tour.id}-embuat-safaris-itinerary.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  };

  // Print / Save Full Illustrated PDF Brochure (Mobile & Desktop Responsive)
  const handlePrintIllustratedBrochure = () => {
    const printWin = window.open('', '_blank', 'width=960,height=800');
    if (!printWin) return;

    const coverSrc = tour.coverImage || tour.image;
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${tour.name} — Official Embuat Safaris Itinerary</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111; background: #fff; padding: 16px; max-width: 900px; margin: 0 auto; line-height: 1.5; }
          .header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; border-bottom: 3px solid #F97316; padding-bottom: 14px; margin-bottom: 18px; }
          .brand { display: flex; align-items: center; gap: 12px; }
          .brand img { width: 56px; height: 56px; border-radius: 50%; object-fit: contain; border: 2px solid #F97316; background: #F3EFE4; }
          .brand h1 { font-family: Georgia, serif; font-size: 20px; color: #000; }
          .brand p { font-size: 11px; color: #F97316; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; }
          .contact-right { font-size: 11.5px; color: #333; line-height: 1.4; }
          .hero { position: relative; border-radius: 16px; overflow: hidden; height: 220px; margin-bottom: 18px; background: #000; }
          .hero img { width: 100%; height: 100%; object-fit: cover; }
          .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0.2)); display: flex; flex-direction: column; justify-content: flex-end; padding: 16px; color: #fff; }
          .badge { display: inline-block; background: #F97316; color: #fff; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 8px; text-transform: uppercase; width: fit-content; margin-bottom: 6px; }
          .hero-title { font-family: Georgia, serif; font-size: 22px; font-weight: 700; line-height: 1.2; }
          .meta-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 20px; }
          .meta-box { padding: 10px 12px; border-radius: 12px; background: #FAF8F5; border: 1px solid #E5E0D8; }
          .meta-label { font-size: 10px; text-transform: uppercase; color: #666; font-weight: 700; }
          .meta-val { font-size: 14px; font-weight: 800; color: #111; margin-top: 2px; }
          .meta-val.orange { color: #F97316; }
          .section-title { font-family: Georgia, serif; font-size: 16px; font-weight: 700; color: #000; margin-bottom: 10px; border-left: 4px solid #F97316; padding-left: 10px; }
          .highlights { display: grid; grid-template-columns: 1fr; gap: 6px; margin-bottom: 20px; }
          .hl-item { font-size: 12px; padding: 8px 12px; background: #FFF7ED; border: 1px solid #FED7AA; border-radius: 8px; font-weight: 600; }
          .day-card { border: 1px solid #E5E7EB; border-radius: 12px; padding: 12px 14px; margin-bottom: 10px; page-break-inside: avoid; background: #FAFAFA; }
          .day-head { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
          .day-num { background: #F97316; color: #fff; font-weight: 800; font-size: 10px; padding: 3px 8px; border-radius: 6px; white-space: nowrap; }
          .day-title { font-family: Georgia, serif; font-size: 14px; font-weight: 700; color: #000; }
          .day-desc { font-size: 12px; color: #333; margin-bottom: 8px; }
          .day-meta { font-size: 11px; color: #555; border-top: 1px solid #E5E7EB; padding-top: 6px; display: flex; flex-wrap: wrap; gap: 12px; font-weight: 600; }
          .inc-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 16px; page-break-inside: avoid; }
          .inc-box { border: 1px solid #E5E7EB; border-radius: 12px; padding: 12px 14px; }
          .inc-box h4 { font-size: 13px; margin-bottom: 6px; color: #F97316; }
          .inc-box ul { padding-left: 16px; font-size: 11.5px; color: #333; }
          .inc-box li { margin-bottom: 4px; }
          .footer { margin-top: 22px; padding: 14px; background: #0A0A0A; color: #fff; border-radius: 12px; text-align: center; font-size: 11px; line-height: 1.5; }
          @media (min-width: 640px) {
            body { padding: 28px; }
            .hero { height: 280px; }
            .hero-title { font-size: 28px; }
            .meta-grid { grid-template-columns: repeat(4, 1fr); }
            .highlights { grid-template-columns: repeat(2, 1fr); }
            .inc-grid { grid-template-columns: repeat(2, 1fr); }
            .contact-right { text-align: right; }
          }
          @media print { body { padding: 10px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="brand">
            <img src="${window.location.origin}/embuat-safaris-logo.jpg" alt="Embuat Safaris" />
            <div>
              <h1>EMBUAT SAFARIS</h1>
              <p>Explore • Experience • Preserve</p>
            </div>
          </div>
          <div class="contact-right">
            <strong>Monduli Juu, Tanzania</strong><br/>
            Phone / WhatsApp: +255 785 341 091<br/>
            Email: gabrielzablon6@gmail.com
          </div>
        </div>

        <div class="hero">
          <img src="${coverSrc}" alt="${tour.name}" />
          <div class="hero-overlay">
            <span class="badge">${tour.duration} • ${tour.category}</span>
            <div class="hero-title">${tour.name}</div>
          </div>
        </div>

        <div class="meta-grid">
          <div class="meta-box"><div class="meta-label">Duration</div><div class="meta-val">${tour.duration}</div></div>
          <div class="meta-box"><div class="meta-label">Category</div><div class="meta-val">${tour.category}</div></div>
          <div class="meta-box"><div class="meta-label">Starting Price</div><div class="meta-val orange">$${tour.fromPrice.toLocaleString()} USD / pp</div></div>
          <div class="meta-box"><div class="meta-label">Vehicle</div><div class="meta-val">Private 4x4 Cruiser</div></div>
        </div>

        <div class="section-title">Expedition Highlights</div>
        <div class="highlights">
          ${tour.highlights.map(h => `<div class="hl-item">✓ ${h}</div>`).join('')}
        </div>

        <div class="section-title">Detailed Day-by-Day Itinerary</div>
        ${tour.itinerary.map(d => `
          <div class="day-card">
            <div class="day-head">
              <span class="day-num">DAY ${d.day}</span>
              <span class="day-title">${d.title}</span>
            </div>
            <p class="day-desc">${d.activities}</p>
            <div class="day-meta">
              <span>🏕 Lodge / Camp: ${d.accommodation}</span>
              <span>🍽 Catering: ${d.meals}</span>
            </div>
          </div>
        `).join('')}

        <div class="inc-grid">
          <div class="inc-box">
            <h4>✓ What's Included</h4>
            <ul>${tour.included.map(i => `<li>${i}</li>`).join('')}</ul>
          </div>
          <div class="inc-box">
            <h4 style="color:#333;">✕ What's Not Included</h4>
            <ul>${tour.notIncluded.map(i => `<li>${i}</li>`).join('')}</ul>
          </div>
        </div>

        <div class="footer">
          <strong>EMBUAT SAFARIS • MONDULI JUU, TANZANIA (-3.14150, 36.43046)</strong><br/>
          Call / WhatsApp: +255 785 341 091 • Email: gabrielzablon6@gmail.com
        </div>
        <script>
          window.onload = () => { setTimeout(() => { window.print(); }, 400); };
        </script>
      </body>
      </html>
    `;
    printWin.document.open();
    printWin.document.write(html);
    printWin.document.close();
  };

  const handleCopyFullItinerary = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(fullText)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(`${tour.name} — Official Embuat Safaris Itinerary`)}&body=${encodeURIComponent(fullText)}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl bg-white dark:bg-[#0A0A0A] rounded-t-3xl sm:rounded-3xl border-t-2 sm:border-2 border-[#F97316]/50 shadow-2xl overflow-hidden h-[92dvh] sm:h-auto sm:max-h-[90dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── STICKY TOP HEADER & INSTANT SHARE ACTION BAR ── */}
        <div className="bg-black text-white px-4 sm:px-6 pt-3.5 pb-3 border-b border-white/10 flex-shrink-0 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src="/embuat-safaris-logo.jpg?v=2"
                alt="Embuat Safaris"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-contain bg-[#F3EFE4] border border-[#F97316] flex-shrink-0"
              />
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-serif font-bold text-white truncate">
                  Official Safari Dossier &amp; Share
                </h3>
                <p className="text-[10px] text-[#F97316] font-semibold truncate">
                  Embuat Safaris • Monduli Juu, Tanzania
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Share Itinerary"
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#F97316] text-white flex items-center justify-center transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 4-Column Quick Share Bar (Fits 100% cleanly on mobile without scrolling) */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            <button
              type="button"
              disabled={isGenerating}
              onClick={handleNativeShareWithPictures}
              className="flex flex-col items-center justify-center gap-1 py-2 px-1.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-[10px] sm:text-xs transition-all shadow-sm cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span className="truncate">{isGenerating ? 'Wait...' : 'Share Card'}</span>
            </button>

            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 py-2 px-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] sm:text-xs transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="truncate">WhatsApp</span>
            </a>

            <button
              type="button"
              disabled={isGenerating}
              onClick={handleDownloadPoster}
              className="flex flex-col items-center justify-center gap-1 py-2 px-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 font-bold text-[10px] sm:text-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#F97316]" />
              <span className="truncate">Save Image</span>
            </button>

            <button
              type="button"
              onClick={handlePrintIllustratedBrochure}
              className="flex flex-col items-center justify-center gap-1 py-2 px-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 font-bold text-[10px] sm:text-xs transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#F97316]" />
              <span className="truncate">PDF / Print</span>
            </button>
          </div>

          {/* Copy & Email Bar */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopyFullItinerary}
              className="flex-1 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-[11px] font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#F97316]" />}
              <span>{copied ? 'Full Itinerary Copied!' : 'Copy Full Text Itinerary'}</span>
            </button>
            <a
              href={emailShareUrl}
              className="py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-[11px] font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* ── SINGLE SMOOTH-SCROLL ILLUSTRATED ITINERARY DOSSIER ── */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-5 bg-neutral-50 dark:bg-[#0D0D0D]">

          {/* 1. Hero Cover Image & Package Header */}
          <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 shadow-sm">
            <div className="relative h-44 sm:h-56 bg-black">
              <img
                src={tour.coverImage || tour.image}
                alt={tour.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>

              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#F97316] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                  {tour.category}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[10px] font-bold border border-white/20 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#F97316]" /> {tour.duration}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[10px] sm:text-xs text-[#F97316] font-bold flex items-center gap-1 mb-0.5">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{tour.location || 'Tanzania Wildlife Sanctuaries'}</span>
                </p>
                <h2 className="text-base sm:text-xl font-serif font-bold leading-snug">
                  {tour.name}
                </h2>
              </div>
            </div>

            {/* Quick Facts Strip */}
            <div className="grid grid-cols-3 divide-x divide-black/10 dark:divide-white/10 border-t border-black/10 dark:border-white/10 text-center py-2.5 px-2 bg-white dark:bg-[#141414]">
              <div>
                <span className="block text-[9.5px] uppercase tracking-wider text-neutral-500 font-bold">From Price</span>
                <span className="text-xs sm:text-sm font-extrabold text-[#F97316]">${tour.fromPrice} / pp</span>
              </div>
              <div>
                <span className="block text-[9.5px] uppercase tracking-wider text-neutral-500 font-bold">Duration</span>
                <span className="text-xs sm:text-sm font-bold text-black dark:text-white">{tour.duration}</span>
              </div>
              <div>
                <span className="block text-[9.5px] uppercase tracking-wider text-neutral-500 font-bold">Transport</span>
                <span className="text-xs sm:text-sm font-bold text-black dark:text-white">4x4 Cruiser</span>
              </div>
            </div>
          </div>

          {/* 2. Key Highlights */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#F97316] mb-2.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Package Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tour.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300 leading-snug">
                  <CheckCircle className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Complete Day-by-Day Schedule */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#F97316] px-1">
              Day-by-Day Expedition Schedule ({tour.itinerary.length} Days)
            </h4>
            {tour.itinerary.map((day) => (
              <div
                key={day.day}
                className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 space-y-2"
              >
                <div className="flex items-start gap-2.5">
                  <span className="px-2.5 py-1 rounded-lg bg-[#F97316] text-white font-extrabold text-[10px] uppercase flex-shrink-0 mt-0.5">
                    Day {day.day}
                  </span>
                  <h5 className="font-serif font-bold text-xs sm:text-sm text-black dark:text-white leading-snug">
                    {day.title}
                  </h5>
                </div>
                <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                  {day.activities}
                </p>
                <div className="pt-2 border-t border-black/10 dark:border-white/10 flex flex-wrap gap-2 text-[10.5px]">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300">
                    <Camera className="w-3 h-3 text-[#F97316] flex-shrink-0" />
                    <strong className="font-semibold">Stay:</strong> {day.accommodation}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300">
                    <Utensils className="w-3 h-3 text-[#F97316] flex-shrink-0" />
                    <strong className="font-semibold">Meals:</strong> {day.meals}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 4. Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10">
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-[#F97316] mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> Included
              </h5>
              <ul className="space-y-1.5 text-[11px] text-neutral-700 dark:text-neutral-300">
                {tour.included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-snug">
                    <span className="text-[#F97316] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10">
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" /> Not Included
              </h5>
              <ul className="space-y-1.5 text-[11px] text-neutral-600 dark:text-neutral-400">
                {tour.notIncluded.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-snug">
                    <span className="text-neutral-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5. Official Contact Stamp */}
          <div className="p-3.5 rounded-2xl bg-black text-white border border-[#F97316]/40 text-center space-y-1">
            <p className="text-[11px] font-bold text-[#F97316] uppercase tracking-wider">
              Embuat Safaris • Monduli Juu, Tanzania
            </p>
            <p className="text-[11px] text-white/85">
              Call / WhatsApp: +255 785 341 091 • gabrielzablon6@gmail.com
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShareItineraryModal;
