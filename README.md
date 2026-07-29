# Kanban İdarəetmə Sistemi
Tapşırıqları sütunlar arasında idarə etməyə imkan verən, tam funksional Kanban tipli lövhə.

## Layihənin qısa təsviri
Vanilla JavaScript ilə yaradılmış, tapşırıqları "To Do", "In Progress" və "Done" sütunları arasında idarə edən Kanban lövhəsi. Bütün məlumatlar 
brauzerin localStorage-ında saxlanılır, səhifə yenilənəndə itmir.

## İstifadə olunan texnologiyalar
- HTML5 (semantik struktur)
- CSS3 (Flexbox, mobile-first responsiv dizayn, animasiyalar)
- Vanilla JavaScript (DOM manipulyasiyası, HTML5 Drag and Drop API, localStorage)

## Quraşdırma / işə salma addımları
1. Repo-nu kompüterinizə köçürün (clone edin) və ya ZIP kimi endirin
2. `index.html` faylını istənilən brauzerdə açın
3. Əlavə quraşdırma, paket və ya server tələb olunmur

## Xüsusiyyətlər
- Tapşırıqların JS massivindən dinamik render olunması
- Tapşırıq əlavə et / redaktə et / sil funksionallığı
- Sütunlar arası drag-and-drop (HTML5 Drag and Drop API)
- localStorage ilə saxlama (səhifə yenilənəndə vəziyyət qorunur)
- Açar söz və prioritet üzrə axtarış/filtrasiya
- XSS-dən qorunma (textContent istifadəsi) və təkrarlanan tapşırığın qarşısının alınması
- Responsiv dizayn (mobil/tablet/desktop)

## Ekran görüntüləri
  <img width="1000" alt="Desktop görünüş" src="https://github.com/user-attachments/assets/854f5a2c-cc46-4f1e-b420-33bda1d7f673" />
  <img width="1000" alt="Modal hissəsi" src="https://github.com/user-attachments/assets/5c6fb866-6237-4eac-aef4-8368f4db563d" />
  <img width="850" alt="Mobil görünüş" src="https://github.com/user-attachments/assets/e98185cb-18c1-4d43-8daf-8f08a93897c2" />
  <img width="800" alt="Delete hissəsi" src="https://github.com/user-attachments/assets/9ae2f718-292e-413e-813a-9f9127f67839" />

## Canlı demo
https://vusalamirzazada.github.io/Kanban-Task-Board/
