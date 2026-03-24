import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Lang = 'en' | 'ar'

const translations = {
  // ─── Layout ───
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.myLoans': { en: 'My Loans', ar: 'تمويلاتي' },
  'nav.dataHub': { en: 'Data Hub', ar: 'مركز البيانات' },
  'nav.myProfile': { en: 'My Profile', ar: 'ملفي الشخصي' },
  'nav.helpSupport': { en: 'Help & Support', ar: 'المساعدة والدعم' },
  'nav.settings': { en: 'Settings', ar: 'الإعدادات' },
  'nav.firstTimeUser': { en: 'First-time user', ar: 'مستخدم جديد' },
  'nav.signOut': { en: 'Sign Out', ar: 'تسجيل الخروج' },
  'nav.switchProfile': { en: 'Switch Profile', ar: 'تبديل الملف الشخصي' },

  // ─── Header ───
  'header.goodMorning': { en: 'Good morning', ar: 'صباح الخير' },
  'header.goodAfternoon': { en: 'Good afternoon', ar: 'مساء الخير' },
  'header.goodEvening': { en: 'Good evening', ar: 'مساء الخير' },
  'header.newLoanRequest': { en: 'New Loan Request', ar: 'طلب تمويل جديد' },

  // ─── Dashboard ───
  'dashboard.demo': { en: 'Demo:', ar: 'عرض:' },
  'dashboard.notVerified': { en: 'Not Verified', ar: 'غير موثق' },
  'dashboard.verified': { en: 'Verified', ar: 'موثق' },

  // ─── Quick Stats ───
  'stats.totalFinancing': { en: 'Total Financing', ar: 'إجمالي التمويل' },
  'stats.activeLoans': { en: 'Active Loans', ar: 'التمويلات النشطة' },
  'stats.nextPayment': { en: 'Next Payment', ar: 'الدفعة القادمة' },
  'stats.creditScore': { en: 'Credit Score', ar: 'التصنيف الائتماني' },
  'stats.noActiveLoans': { en: 'No active loans', ar: 'لا توجد تمويلات نشطة' },
  'stats.across3Active': { en: 'Across 3 active financings', ar: 'عبر 3 تمويلات نشطة' },
  'stats.nextPaymentDate': { en: 'Next payment: Apr 1, 2026', ar: 'الدفعة القادمة: 1 أبريل 2026' },
  'stats.underReview': { en: 'Under review', ar: 'قيد المراجعة' },
  'stats.noFinancings': { en: 'Apply for your first financing', ar: 'تقدم بطلب تمويلك الأول' },
  'stats.noPayments': { en: 'No upcoming payments', ar: 'لا توجد دفعات قادمة' },
  'stats.getStarted': { en: 'Get started today', ar: 'ابدأ اليوم' },

  // ─── Quick Actions ───
  'actions.quickActions': { en: 'Quick Actions', ar: 'إجراءات سريعة' },
  'actions.repaymentSchedule': { en: 'Repayment Schedule', ar: 'جدول السداد' },
  'actions.trackPayments': { en: 'Track your upcoming payments', ar: 'تتبع دفعاتك القادمة' },
  'actions.transactions': { en: 'Transactions', ar: 'المعاملات' },
  'actions.viewActivity': { en: 'View your financing activity', ar: 'عرض نشاط التمويل' },
  'actions.contactSupport': { en: 'Contact Support', ar: 'اتصل بالدعم' },
  'actions.getHelp': { en: 'Get help from your account manager', ar: 'احصل على مساعدة من مدير حسابك' },
  'actions.knowledgeHub': { en: 'Knowledge Hub', ar: 'مركز المعرفة' },
  'actions.learnFinancing': { en: 'Learn about business financing', ar: 'تعرف على تمويل الأعمال' },
  'actions.watchVideo': { en: 'Watch Video', ar: 'شاهد الفيديو' },
  'actions.seeHowWorks': { en: 'See how FundMe works', ar: 'شاهد كيف يعمل FundMe' },
  'actions.uploadDocuments': { en: 'Upload Documents', ar: 'رفع المستندات' },
  'actions.uploadDocumentsDesc': { en: 'Submit required files', ar: 'تقديم الملفات المطلوبة' },
  'actions.connectBank': { en: 'Connect Bank', ar: 'ربط البنك' },
  'actions.connectBankDesc': { en: 'Link your bank account', ar: 'ربط حسابك البنكي' },
  'actions.companyProfile': { en: 'Company Profile', ar: 'ملف الشركة' },
  'actions.companyProfileDesc': { en: 'View business details', ar: 'عرض تفاصيل الشركة' },
  'actions.requestFinancing': { en: 'Request New Financing', ar: 'طلب تمويل جديد' },
  'actions.requestFinancingDesc': { en: 'Start a new application', ar: 'بدء طلب جديد' },

  // ─── Repayment Schedule ───
  'repayment.upcomingPayments': { en: 'Upcoming Payments', ar: 'الدفعات القادمة' },
  'repayment.viewAll': { en: 'View All', ar: 'عرض الكل' },
  'repayment.dueIn': { en: 'Due in', ar: 'مستحق خلال' },
  'repayment.days': { en: 'days', ar: 'أيام' },
  'repayment.upcoming': { en: 'Upcoming', ar: 'قادم' },
  'repayment.pay': { en: 'Pay →', ar: '← ادفع' },
  'repayment.sadadFinancing': { en: 'SADAD Financing', ar: 'تمويل سداد' },

  // ─── Financing ───
  'financing.options': { en: 'Financing Options', ar: 'خيارات التمويل' },
  'financing.products': { en: 'Financing Products', ar: 'منتجات التمويل' },
  'financing.requestFinancing': { en: 'Request Financing', ar: 'طلب تمويل' },

  // ─── Support ───
  'support.yourSupport': { en: 'Your Support', ar: 'الدعم الخاص بك' },
  'support.needHelp': { en: 'Need Help?', ar: 'هل تحتاج مساعدة؟' },
  'support.contactSupport': { en: 'Contact Support', ar: 'اتصل بالدعم' },
  'support.scheduleCall': { en: 'Schedule a Call', ar: 'جدولة مكالمة' },
  'support.accountManager': { en: 'Account Manager', ar: 'مدير الحساب' },
  'support.getHelp': { en: 'Get help with your account', ar: 'احصل على مساعدة لحسابك' },
  'support.emailLabel': { en: 'Email', ar: 'البريد الإلكتروني' },
  'support.phoneLabel': { en: 'Phone', ar: 'الهاتف' },
  'support.contactInfo': { en: 'Contact Information', ar: 'معلومات التواصل' },

  // ─── Onboarding Checklist ───
  'onboarding.completeProfile': { en: 'Complete Your Profile', ar: 'أكمل ملفك الشخصي' },
  'onboarding.verifyIdentity': { en: 'Verify Identity', ar: 'التحقق من الهوية' },
  'onboarding.connectBank': { en: 'Connect Bank', ar: 'ربط البنك' },
  'onboarding.uploadDocuments': { en: 'Upload Documents', ar: 'رفع المستندات' },
  'onboarding.getStarted': { en: 'Get Started', ar: 'ابدأ الآن' },

  // ─── How FundMe Works ───
  'howItWorks.title': { en: 'How FundMe Works', ar: 'كيف يعمل FundMe' },
  'howItWorks.step1': { en: 'Complete Profile', ar: 'أكمل الملف' },
  'howItWorks.step2': { en: 'Choose Product', ar: 'اختر المنتج' },
  'howItWorks.step3': { en: 'Get Funded', ar: 'احصل على التمويل' },

  // ─── Profile ───
  'profile.personalInfo': { en: 'Personal Information', ar: 'المعلومات الشخصية' },
  'profile.companyInfo': { en: 'Company Information', ar: 'معلومات الشركة' },
  'profile.fullName': { en: 'Full Name', ar: 'الاسم الكامل' },
  'profile.nationalId': { en: 'National ID Number', ar: 'رقم الهوية الوطنية' },
  'profile.dateOfBirth': { en: 'Date of Birth', ar: 'تاريخ الميلاد' },
  'profile.phoneNumber': { en: 'Phone Number', ar: 'رقم الهاتف' },
  'profile.emailAddress': { en: 'Email Address', ar: 'البريد الإلكتروني' },
  'profile.verifiedAccount': { en: 'Verified Account', ar: 'حساب موثق' },
  'profile.memberSince': { en: 'Member since', ar: 'عضو منذ' },
  'profile.companyName': { en: 'Company Name', ar: 'اسم الشركة' },
  'profile.commercialRegistration': { en: 'Commercial Registration (CR)', ar: 'السجل التجاري' },
  'profile.industry': { en: 'Industry', ar: 'القطاع' },
  'profile.businessActivity': { en: 'Business Activity', ar: 'النشاط التجاري' },
  'profile.simahConsent': { en: 'SIMAH Consent', ar: 'موافقة سمة' },
  'profile.importantLinks': { en: 'Important Links', ar: 'روابط مهمة' },
  'profile.termsConditions': { en: 'Terms & Conditions', ar: 'الشروط والأحكام' },
  'profile.privacyPolicy': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  'profile.customerProtection': { en: 'Customer Protection', ar: 'حماية العملاء' },
  'profile.downloadDocument': { en: 'Download Document', ar: 'تحميل المستند' },
  'profile.authorizationDocument': { en: 'Authorization Document', ar: 'وثيقة التفويض' },
  'profile.viewDocument': { en: 'View Document', ar: 'عرض المستند' },
  'profile.reupload': { en: 'Reupload', ar: 'إعادة رفع' },
  'profile.linked': { en: 'Linked', ar: 'مربوط' },
  'profile.sourceWathiq': { en: 'Source: Wathiq', ar: 'المصدر: واثق' },

  // ─── My Loans ───
  'loans.myLoans': { en: 'My Loans', ar: 'تمويلاتي' },
  'loans.all': { en: 'All', ar: 'الكل' },
  'loans.active': { en: 'Active', ar: 'نشط' },
  'loans.inProgress': { en: 'In Progress', ar: 'قيد التنفيذ' },
  'loans.closed': { en: 'Closed', ar: 'مغلق' },
  'loans.viewLoan': { en: 'View Loan', ar: 'عرض التمويل' },
  'loans.viewStatus': { en: 'View Status', ar: 'عرض الحالة' },
  'loans.continueLoan': { en: 'Continue Loan', ar: 'متابعة التمويل' },

  // ─── Loan Details ───
  'loanDetail.loanDetails': { en: 'Loan Details', ar: 'تفاصيل التمويل' },
  'loanDetail.facilityType': { en: 'Facility Type', ar: 'نوع التسهيل' },
  'loanDetail.loanId': { en: 'Loan ID', ar: 'رقم التمويل' },
  'loanDetail.outstandingBalance': { en: 'Outstanding Balance', ar: 'الرصيد المتبقي' },
  'loanDetail.status': { en: 'Status', ar: 'الحالة' },
  'loanDetail.loanProgress': { en: 'Loan Progress', ar: 'تقدم التمويل' },
  'loanDetail.makePayment': { en: 'Make Payment', ar: 'إجراء دفعة' },
  'loanDetail.earlyRepayment': { en: 'Early Repayment', ar: 'السداد المبكر' },
  'loanDetail.info': { en: 'Info', ar: 'معلومات' },
  'loanDetail.repayment': { en: 'Repayment', ar: 'السداد' },
  'loanDetail.transactions': { en: 'Transactions', ar: 'المعاملات' },
  'loanDetail.documents': { en: 'Documents', ar: 'المستندات' },
  'loanDetail.amountDue': { en: 'Amount Due', ar: 'المبلغ المستحق' },
  'loanDetail.dueDate': { en: 'Due Date', ar: 'تاريخ الاستحقاق' },
  'loanDetail.daysRemaining': { en: 'Days Remaining', ar: 'الأيام المتبقية' },
  'loanDetail.approvedAmount': { en: 'Approved Amount', ar: 'المبلغ المعتمد' },
  'loanDetail.profitRate': { en: 'Effective Profit Rate (APR)', ar: 'معدل الربح الفعلي' },
  'loanDetail.originationFee': { en: 'Origination Fee', ar: 'رسوم المعالجة' },
  'loanDetail.totalRepayable': { en: 'Total Repayable', ar: 'إجمالي المبلغ المستحق' },
  'loanDetail.download': { en: 'Download', ar: 'تحميل' },

  // ─── Notifications ───
  'notifications.title': { en: 'Notifications', ar: 'الإشعارات' },
  'notifications.markAllRead': { en: 'Mark all as read', ar: 'تحديد الكل كمقروء' },
  'notifications.today': { en: 'Today', ar: 'اليوم' },
  'notifications.yesterday': { en: 'Yesterday', ar: 'أمس' },
  'notifications.earlier': { en: 'Earlier', ar: 'سابقاً' },

  // ─── Settings ───
  'settings.title': { en: 'Settings', ar: 'الإعدادات' },
  'settings.appearance': { en: 'Appearance', ar: 'المظهر' },
  'settings.darkMode': { en: 'Dark Mode', ar: 'الوضع الداكن' },
  'settings.switchDarkTheme': { en: 'Switch to dark theme', ar: 'التبديل إلى الوضع الداكن' },
  'settings.languageRegion': { en: 'Language & Region', ar: 'اللغة والمنطقة' },
  'settings.language': { en: 'Language', ar: 'اللغة' },
  'settings.switchLanguage': { en: 'Switch between English and Arabic', ar: 'التبديل بين الإنجليزية والعربية' },

  // ─── Modals ───
  'modal.makePayment': { en: 'Make Payment', ar: 'إجراء دفعة' },
  'modal.paymentAmount': { en: 'Payment Amount', ar: 'مبلغ الدفعة' },
  'modal.paymentDetails': { en: 'Payment Details', ar: 'تفاصيل الدفعة' },
  'modal.financing': { en: 'Financing', ar: 'التمويل' },
  'modal.installment': { en: 'Installment', ar: 'القسط' },
  'modal.paymentMethod': { en: 'Payment Method', ar: 'طريقة الدفع' },
  'modal.confirmPayment': { en: 'Confirm Payment →', ar: '← تأكيد الدفعة' },
  'modal.paymentSuccessful': { en: 'Payment Successful', ar: 'تمت عملية الدفع بنجاح' },
  'modal.done': { en: 'Done', ar: 'تم' },
  'modal.processing': { en: 'Processing...', ar: 'جارٍ المعالجة...' },
  'modal.repayViaBankTransfer': { en: 'Repay Your Loan via Bank Transfer', ar: 'سداد القرض عبر التحويل البنكي' },
  'modal.bankTransferSubtitle': { en: 'Use the details below to complete your loan repayment.\nFor other banks, please use the IBAN number.', ar: 'استخدم التفاصيل أدناه لإتمام سداد القرض.\nللبنوك الأخرى، يرجى استخدام رقم الآيبان.' },
  'modal.bankName': { en: 'Bank Name', ar: 'اسم البنك' },
  'modal.accountNumber': { en: 'Account Number', ar: 'رقم الحساب' },
  'modal.iban': { en: 'IBAN', ar: 'آيبان' },
  'modal.beneficiaryName': { en: 'Beneficiary Name', ar: 'اسم المستفيد' },
  'modal.bankTransferNote': { en: 'Repayment processing may take 24-48 business hours.', ar: 'قد تستغرق معالجة السداد من 24 إلى 48 ساعة عمل.' },
  'modal.callAction': { en: 'Call', ar: 'اتصال' },
  'modal.emailUs': { en: 'Email Us', ar: 'راسلنا' },
  'modal.sendEmail': { en: 'Send', ar: 'إرسال' },
  'modal.openChat': { en: 'Open', ar: 'فتح' },
  'modal.earlySettlement': { en: 'Early Settlement', ar: 'السداد المبكر' },
  'modal.remainingBalance': { en: 'Remaining Balance', ar: 'الرصيد المتبقي' },
  'modal.payFullBalance': { en: 'Pay Full Balance →', ar: '← دفع كامل الرصيد' },
  'modal.contactSupport': { en: 'Contact Support', ar: 'اتصل بالدعم' },
  'modal.sendMessage': { en: 'Send Message →', ar: '← إرسال رسالة' },
  'modal.liveChat': { en: 'Live Chat', ar: 'محادثة مباشرة' },
  'modal.callNow': { en: 'Call Now', ar: 'اتصل الآن' },
  'modal.changePhone': { en: 'Change Phone Number', ar: 'تغيير رقم الهاتف' },
  'modal.changeEmail': { en: 'Change Email Address', ar: 'تغيير البريد الإلكتروني' },

  // ─── Login ───
  'login.welcomeBack': { en: 'Welcome Back', ar: 'مرحباً بعودتك' },
  'login.signIn': { en: 'Sign in to your account', ar: 'تسجيل الدخول إلى حسابك' },
  'login.continue': { en: 'Continue', ar: 'متابعة' },
  'login.dontHaveAccount': { en: "Don't have an account?", ar: 'ليس لديك حساب؟' },
  'login.register': { en: 'Register', ar: 'تسجيل' },
  'login.verifyMobile': { en: 'Verify your mobile', ar: 'تحقق من رقم هاتفك' },
  'login.verifySignIn': { en: 'Verify & Sign In', ar: 'تحقق وسجّل الدخول' },

  // ─── Wizard / Request Financing ───
  'wizard.step': { en: 'Step', ar: 'خطوة' },
  'wizard.of': { en: 'of', ar: 'من' },
  'wizard.saveExit': { en: 'Save & Exit', ar: 'حفظ والخروج' },
  'wizard.selectCategory': { en: 'Select Category', ar: 'اختر الفئة' },
  'wizard.selectCategoryDesc': { en: 'Choose bill category', ar: 'اختر فئة الفاتورة' },
  'wizard.selectBiller': { en: 'Select Biller', ar: 'اختر المفوتر' },
  'wizard.selectBillerDesc': { en: 'Pick your biller', ar: 'اختر مقدم الخدمة' },
  'wizard.invoiceDetails': { en: 'Invoice Details', ar: 'تفاصيل الفاتورة' },
  'wizard.invoiceDetailsDesc': { en: 'Enter bill details', ar: 'أدخل تفاصيل الفاتورة' },
  'wizard.documents': { en: 'Documents', ar: 'المستندات' },
  'wizard.documentsDesc': { en: 'Upload required docs', ar: 'ارفع المستندات المطلوبة' },
  'wizard.connectBank': { en: 'Connect Bank', ar: 'ربط البنك' },
  'wizard.connectBankDesc': { en: 'Link your bank account', ar: 'اربط حسابك البنكي' },
  'wizard.selectBillCategory': { en: 'Select Bill Category', ar: 'اختر فئة الفاتورة' },
  'wizard.chooseCategoryDesc': { en: 'Choose a category to browse billers', ar: 'اختر فئة لتصفح مقدمي الخدمات' },
  'wizard.continue': { en: 'Continue', ar: 'متابعة' },
  'wizard.catGovernment': { en: 'Government', ar: 'حكومي' },
  'wizard.catUtilities': { en: 'Utilities', ar: 'خدمات المرافق' },
  'wizard.catTelecom': { en: 'Telecom', ar: 'اتصالات' },
  'wizard.catBanks': { en: 'Banks', ar: 'بنوك' },
  'wizard.catServices': { en: 'Services', ar: 'خدمات' },
  'wizard.catOthers': { en: 'Others', ar: 'أخرى' },

  // ─── Register ───
  'register.getStarted': { en: 'Get started', ar: 'ابدأ الآن' },
  'register.enterMobile': { en: 'Enter your mobile number to create your account', ar: 'أدخل رقم هاتفك لإنشاء حسابك' },
  'register.alreadyHaveAccount': { en: 'Already have an account?', ar: 'لديك حساب بالفعل؟' },
  'register.signIn': { en: 'Sign in', ar: 'تسجيل الدخول' },
  'register.verifyMobile': { en: 'Verify your mobile', ar: 'تحقق من رقم هاتفك' },
  'register.completeProfile': { en: 'Complete your profile', ar: 'أكمل ملفك الشخصي' },
  'register.enterDetails': { en: 'Enter your details to set up your account', ar: 'أدخل بياناتك لإعداد حسابك' },

  // ─── Data Hub ───
  'dataHub.title': { en: 'Data Hub', ar: 'مركز البيانات' },
  'dataHub.documents': { en: 'Documents', ar: 'المستندات' },
  'dataHub.bankConnections': { en: 'Bank Connections', ar: 'الربط البنكي' },
  'dataHub.uploadDocuments': { en: 'Upload Documents', ar: 'رفع المستندات' },
  'dataHub.requiredDocuments': { en: 'Required Documents', ar: 'المستندات المطلوبة' },
  'dataHub.showMissing': { en: 'Show Missing Only', ar: 'عرض الناقصة فقط' },
  'dataHub.uploaded': { en: 'Uploaded', ar: 'مرفوع' },
  'dataHub.pending': { en: 'Pending', ar: 'قيد الانتظار' },
  'dataHub.legal': { en: 'Legal', ar: 'قانوني' },
  'dataHub.financial': { en: 'Financial', ar: 'مالي' },
  'dataHub.all': { en: 'All', ar: 'الكل' },

  // ─── Common ───
  'common.of': { en: 'of', ar: 'من' },
  'common.back': { en: 'Back', ar: 'رجوع' },
  'common.next': { en: 'Next', ar: 'التالي' },
  'common.cancel': { en: 'Cancel', ar: 'إلغاء' },
  'common.save': { en: 'Save', ar: 'حفظ' },
  'common.close': { en: 'Close', ar: 'إغلاق' },
  'common.sending': { en: 'Sending...', ar: 'جارٍ الإرسال...' },
  'common.verifying': { en: 'Verifying...', ar: 'جارٍ التحقق...' },
  'common.saving': { en: 'Saving...', ar: 'جارٍ الحفظ...' },
  'common.resendCode': { en: 'Resend code', ar: 'إعادة إرسال الرمز' },
  'common.resendCodeIn': { en: 'Resend code in', ar: 'إعادة إرسال الرمز خلال' },
  'common.viewAll': { en: 'View All', ar: 'عرض الكل' },
  'common.confirm': { en: 'Confirm', ar: 'تأكيد' },
  'common.processing': { en: 'Processing...', ar: 'جارٍ المعالجة...' },

  // ─── Footer ───
  'footer.encryption': { en: '256-bit encryption · Bank-level security · SAMA regulated', ar: 'تشفير 256 بت · أمان بمستوى البنوك · منظم من ساما' },

  // ─── How It Works (steps) ───
  'howItWorks.step1Num': { en: 'STEP 1', ar: 'الخطوة ١' },
  'howItWorks.step1Title': { en: 'Complete your profile', ar: 'أكمل ملفك الشخصي' },
  'howItWorks.step1Desc': { en: 'Verify your identity & business', ar: 'تحقق من هويتك ونشاطك التجاري' },
  'howItWorks.step2Num': { en: 'STEP 2', ar: 'الخطوة ٢' },
  'howItWorks.step2Title': { en: 'Choose a product', ar: 'اختر المنتج' },
  'howItWorks.step2Desc': { en: 'Pick the financing that fits your needs', ar: 'اختر التمويل المناسب لاحتياجاتك' },
  'howItWorks.step3Num': { en: 'STEP 3', ar: 'الخطوة ٣' },
  'howItWorks.step3Title': { en: 'Get funded', ar: 'احصل على التمويل' },
  'howItWorks.step3Desc': { en: 'Receive funds in as little as 24 hours', ar: 'استلم الأموال خلال ٢٤ ساعة' },
  'howItWorks.applyMinutes': { en: 'Apply in minutes', ar: 'تقدم في دقائق' },
  'howItWorks.funds24h': { en: 'Funds in 24 hours', ar: 'تمويل خلال ٢٤ ساعة' },
  'howItWorks.shariaCompliant': { en: 'Sharia-compliant', ar: 'متوافق مع الشريعة' },
  'howItWorks.noCollateral': { en: 'No collateral', ar: 'بدون ضمانات' },
  'howItWorks.samaRegulated': { en: 'SAMA regulated', ar: 'منظم من ساما' },

  // ─── Financing Products/Options ───
  'product.businessGrowth': { en: 'Business Growth', ar: 'نمو الأعمال' },
  'product.workingCapital': { en: 'Working Capital', ar: 'رأس المال العامل' },
  'product.workingCapitalDesc': { en: 'Access flexible funding to manage cash flow, invest in inventory, or scale your operations.', ar: 'احصل على تمويل مرن لإدارة التدفقات النقدية والاستثمار في المخزون أو توسيع عملياتك.' },
  'product.cashFlow': { en: 'Cash Flow', ar: 'التدفق النقدي' },
  'product.invoiceFinancing': { en: 'Invoice Financing', ar: 'تمويل الفواتير' },
  'product.invoiceFinancingDesc': { en: "Turn your outstanding invoices into immediate cash. Don't wait 60–90 days for payment.", ar: 'حوّل فواتيرك المستحقة إلى نقد فوري. لا تنتظر ٦٠-٩٠ يوماً للتحصيل.' },
  'product.payments': { en: 'Payments', ar: 'المدفوعات' },
  'product.sadadFinancing': { en: 'SADAD Financing', ar: 'تمويل سداد' },
  'product.sadadDesc': { en: 'Finance your SADAD bills and government payments with flexible repayment terms.', ar: 'موّل فواتير سداد والمدفوعات الحكومية بشروط سداد مرنة.' },
  'product.completeToApply': { en: 'Complete your profile to apply for financing', ar: 'أكمل ملفك الشخصي لتقديم طلب تمويل' },
  'product.learn': { en: 'Learn', ar: 'تعرف أكثر' },
  'product.apply': { en: 'Apply', ar: 'تقديم طلب' },
  'product.comingSoon': { en: 'Coming Soon', ar: 'قريباً' },
  'product.availableNow': { en: 'Available now', ar: 'متاح الآن' },
  'product.chooseRight': { en: 'Choose the right financing product for your business', ar: 'اختر منتج التمويل المناسب لأعمالك' },

  // ─── Onboarding Checklist ───
  'onboarding.finishSetup': { en: 'Finish setup to unlock financing options', ar: 'أكمل الإعداد لفتح خيارات التمويل' },
  'onboarding.complete': { en: 'Complete', ar: 'مكتمل' },
  'onboarding.completed': { en: 'Completed', ar: 'مكتمل' },

  // ─── Recent Application ───
  'recent.myRecentApps': { en: 'My Recent Applications', ar: 'طلباتي الأخيرة' },
  'recent.all': { en: 'All', ar: 'الكل' },
  'recent.submitted': { en: 'Submitted', ar: 'مقدم' },
  'recent.underReview': { en: 'Under Review', ar: 'قيد المراجعة' },
  'recent.approved': { en: 'Approved', ar: 'معتمد' },
  'recent.rejected': { en: 'Rejected', ar: 'مرفوض' },
  'recent.noApps': { en: 'No applications with this status', ar: 'لا توجد طلبات بهذه الحالة' },
  'recent.financingAmount': { en: 'Financing Amount', ar: 'مبلغ التمويل' },
  'recent.viewStatus': { en: 'View Status', ar: 'عرض الحالة' },

  // ─── Payment Modal extras ───
  'modal.connectedBank': { en: 'Connected Bank (Al Rajhi ****1234)', ar: 'بنك مربوط (الراجحي ****١٢٣٤)' },
  'modal.sadad': { en: 'SADAD', ar: 'سداد' },
  'modal.madaCard': { en: 'Mada Card', ar: 'بطاقة مدى' },
  'modal.transactionId': { en: 'Transaction ID', ar: 'رقم المعاملة' },
  'modal.date': { en: 'Date', ar: 'التاريخ' },
  'modal.paymentProcessed': { en: 'Your payment has been processed successfully.', ar: 'تم معالجة دفعتك بنجاح.' },

  // ─── Contact Support extras ───
  'modal.orSendMessage': { en: 'Or send us a message', ar: 'أو أرسل لنا رسالة' },
  'modal.selectSubject': { en: 'Select a subject', ar: 'اختر الموضوع' },
  'modal.generalInquiry': { en: 'General Inquiry', ar: 'استفسار عام' },
  'modal.paymentIssue': { en: 'Payment Issue', ar: 'مشكلة في الدفع' },
  'modal.financingQuestion': { en: 'Financing Question', ar: 'سؤال عن التمويل' },
  'modal.technicalSupport': { en: 'Technical Support', ar: 'دعم فني' },
  'modal.other': { en: 'Other', ar: 'أخرى' },
  'modal.yourMessage': { en: 'Your message...', ar: 'رسالتك...' },

  // ─── Early Payment extras ───
  'modal.remainingPrincipal': { en: 'Remaining Principal', ar: 'أصل المبلغ المتبقي' },
  'modal.accruedProfit': { en: 'Accrued Profit', ar: 'الأرباح المتراكمة' },
  'modal.earlySettlementFee': { en: 'Early Settlement Fee (2%)', ar: 'رسوم السداد المبكر (٢٪)' },
  'modal.totalEarlyPayment': { en: 'Total Early Payment', ar: 'إجمالي السداد المبكر' },
  'modal.settlementSuccessful': { en: 'Settlement Successful', ar: 'تم السداد بنجاح' },
  'modal.settlementProcessed': { en: 'Your early settlement has been processed successfully.', ar: 'تم معالجة السداد المبكر بنجاح.' },
  'modal.youSave': { en: 'You save', ar: 'توفر' },
  'modal.comparedToContinuing': { en: 'compared to continuing installments', ar: 'مقارنة بالاستمرار في الأقساط' },
  'modal.earlyRepaymentOptions': { en: 'Early Repayment Options', ar: 'خيارات السداد المبكر' },
  'modal.earlyRepaymentSubtitle': { en: "Tell us how you'd like to adjust your loan. We'll review your request and contact you with the best option.", ar: 'أخبرنا كيف تريد تعديل قرضك. سنراجع طلبك ونتواصل معك بأفضل خيار.' },
  'modal.finishLoanEarlier': { en: 'Finish your loan earlier', ar: 'إنهاء القرض مبكراً' },
  'modal.finishLoanEarlierDesc': { en: 'Keep a similar installment amount but reduce the total remaining time.', ar: 'حافظ على مبلغ قسط مماثل مع تقليل المدة المتبقية.' },
  'modal.lowerInstallment': { en: 'Lower your monthly installment', ar: 'تخفيض القسط الشهري' },
  'modal.lowerInstallmentDesc': { en: 'Extend the remaining duration to make each payment more affordable.', ar: 'تمديد المدة المتبقية لجعل كل دفعة أكثر ملاءمة.' },
  'modal.whenFinishLoan': { en: 'When would you like to finish your loan?', ar: 'متى تريد إنهاء قرضك؟' },
  'modal.selectTiming': { en: 'Select timing', ar: 'اختر المدة' },
  'modal.requestSubmitted': { en: 'Request Submitted', ar: 'تم تقديم الطلب' },
  'modal.earlyRepaymentSuccess': { en: "We've received your early repayment request. Our team will review it and get back to you within 1-2 business days.", ar: 'لقد تلقينا طلب السداد المبكر. سيقوم فريقنا بمراجعته والتواصل معك خلال 1-2 أيام عمل.' },
  'modal.requestType': { en: 'Request Type', ar: 'نوع الطلب' },
  'modal.targetDuration': { en: 'Target Duration', ar: 'المدة المستهدفة' },
  'modal.status': { en: 'Status', ar: 'الحالة' },
  'modal.underReview': { en: 'Under Review', ar: 'قيد المراجعة' },
  'modal.targetInstallment': { en: 'Target installment amount (approx.)', ar: 'مبلغ القسط المستهدف (تقريبي)' },
  'modal.confirmRequest': { en: 'Confirm your early repayment request', ar: 'تأكيد طلب السداد المبكر' },
  'modal.confirmRequestSubtitle': { en: 'Your account manager will contact you to explain the options and confirm the new plan.', ar: 'سيتواصل معك مدير حسابك لشرح الخيارات وتأكيد الخطة الجديدة.' },
  'modal.youChose': { en: 'You chose', ar: 'اخترت' },
  'modal.target': { en: 'Target', ar: 'الهدف' },
  'modal.howContacted': { en: 'How would you like to be contacted?', ar: 'كيف تفضل أن نتواصل معك؟' },
  'modal.call': { en: 'Call', ar: 'اتصال' },
  'modal.whatsapp': { en: 'WhatsApp', ar: 'واتساب' },
  'modal.email': { en: 'Email', ar: 'بريد إلكتروني' },
  'modal.preferredContactTime': { en: 'Preferred contact time (optional)', ar: 'وقت التواصل المفضل (اختياري)' },
  'modal.selectTimePreference': { en: 'Select time preference', ar: 'اختر وقت التواصل' },
  'modal.additionalNotes': { en: 'Additional notes (optional)', ar: 'ملاحظات إضافية (اختياري)' },
  'modal.notesPlaceholder': { en: 'Add any details that can help us (for example: preferred monthly budget or target date).', ar: 'أضف أي تفاصيل تساعدنا (مثال: الميزانية الشهرية المفضلة أو التاريخ المستهدف).' },
  'modal.yourLoanDetails': { en: 'Your loan details', ar: 'تفاصيل القرض' },
  'modal.loanId': { en: 'Loan ID', ar: 'رقم القرض' },
  'modal.outstandingBalance': { en: 'Outstanding Balance', ar: 'الرصيد المتبقي' },
  'modal.installmentAmount': { en: 'Installment Amount', ar: 'مبلغ القسط' },
  'modal.phone': { en: 'Phone', ar: 'الهاتف' },
  'modal.accountManager': { en: 'Account Manager', ar: 'مدير الحساب' },
  'modal.submitRequest': { en: 'Submit Request', ar: 'تقديم الطلب' },
  'modal.contactVia': { en: 'Contact via', ar: 'التواصل عبر' },

  // ─── Change Contact extras ───
  'modal.currentNumber': { en: 'Current Number', ar: 'الرقم الحالي' },
  'modal.currentEmail': { en: 'Current Email', ar: 'البريد الحالي' },
  'modal.newPhone': { en: 'New Phone Number', ar: 'رقم الهاتف الجديد' },
  'modal.newEmail': { en: 'New Email Address', ar: 'البريد الإلكتروني الجديد' },
  'modal.sendOtp': { en: 'Send OTP', ar: 'إرسال رمز التحقق' },
  'modal.sendVerification': { en: 'Send Verification', ar: 'إرسال التحقق' },
  'modal.enterOtp': { en: 'Enter the 6-digit code sent to your new number', ar: 'أدخل الرمز المكون من ٦ أرقام المرسل لرقمك الجديد' },
  'modal.verify': { en: 'Verify', ar: 'تحقق' },
  'modal.emailSent': { en: "We've sent a verification link to your new email address", ar: 'أرسلنا رابط تحقق إلى بريدك الإلكتروني الجديد' },
  'modal.openEmailApp': { en: 'Open Email App', ar: 'فتح تطبيق البريد' },
  'modal.resendEmail': { en: 'Resend email', ar: 'إعادة إرسال البريد' },
  'modal.phoneUpdated': { en: 'Phone Number Updated', ar: 'تم تحديث رقم الهاتف' },
  'modal.emailUpdated': { en: 'Email Address Updated', ar: 'تم تحديث البريد الإلكتروني' },
  'modal.phoneUpdateSuccess': { en: 'Your phone number has been updated successfully.', ar: 'تم تحديث رقم هاتفك بنجاح.' },
  'modal.emailUpdateSuccess': { en: 'Your email address has been updated successfully.', ar: 'تم تحديث بريدك الإلكتروني بنجاح.' },

  // ─── Loan Details extras ───
  'loanDetail.loanPricing': { en: 'Loan Pricing & Fees', ar: 'تسعير التمويل والرسوم' },
  'loanDetail.loanAmount': { en: 'Loan Amount', ar: 'مبلغ التمويل' },
  'loanDetail.profitFees': { en: 'Profit & Fees', ar: 'الأرباح والرسوم' },
  'loanDetail.performance': { en: 'Performance & Insights', ar: 'الأداء والتحليلات' },
  'loanDetail.onTimePayments': { en: 'On-time Payments', ar: 'الدفعات في موعدها' },
  'loanDetail.installmentsPaid': { en: 'Installments paid', ar: 'الأقساط المدفوعة' },
  'loanDetail.disbursementDate': { en: 'Disbursement Date', ar: 'تاريخ الصرف' },
  'loanDetail.maturityDate': { en: 'Maturity Date', ar: 'تاريخ الاستحقاق' },
  'loanDetail.repaymentFrequency': { en: 'Repayment Frequency', ar: 'دورية السداد' },
  'loanDetail.totalInstallments': { en: 'Total Installments', ar: 'إجمالي الأقساط' },
  'loanDetail.repaymentSchedule': { en: 'Repayment Schedule', ar: 'جدول السداد' },
  'loanDetail.principal': { en: 'Principal', ar: 'الأصل' },
  'loanDetail.profit': { en: 'Profit', ar: 'الربح' },
  'loanDetail.total': { en: 'Total', ar: 'الإجمالي' },
  'loanDetail.paid': { en: 'Paid', ar: 'مدفوع' },
  'loanDetail.overdue': { en: 'Overdue', ar: 'متأخر' },
  'loanDetail.transactionHistory': { en: 'Transaction History', ar: 'سجل المعاملات' },
  'loanDetail.completed': { en: 'Completed', ar: 'مكتمل' },
  'loanDetail.pending': { en: 'Pending', ar: 'قيد الانتظار' },
  'loanDetail.loanDocuments': { en: 'Loan Documents', ar: 'مستندات التمويل' },
  'loanDetail.monthly': { en: 'Monthly', ar: 'شهري' },
  'loanDetail.nextPayment': { en: 'Next Payment', ar: 'الدفعة القادمة' },

  // ─── Profile extras ───
  'profile.accountVerifiedDesc': { en: 'Your account has been successfully verified. You can now apply for financing', ar: 'تم التحقق من حسابك بنجاح. يمكنك الآن تقديم طلب تمويل' },
  'profile.simahDesc': { en: 'Your SIMAH consent is approved and ready to download.', ar: 'تم اعتماد موافقة سمة وجاهزة للتحميل.' },
  'profile.wathiqNote': { en: 'Company information is automatically fetched from Wathiq and cannot be edited manually.', ar: 'يتم جلب معلومات الشركة تلقائياً من واثق ولا يمكن تعديلها يدوياً.' },

  // ─── Data Hub extras ───
  'dataHub.legalDocs': { en: 'Legal Documents', ar: 'المستندات القانونية' },
  'dataHub.financialDocs': { en: 'Financial Documents', ar: 'المستندات المالية' },
  'dataHub.connected': { en: 'Connected', ar: 'متصل' },
  'dataHub.reconnectRequired': { en: 'Reconnect Required', ar: 'يتطلب إعادة الربط' },

  // ─── Register form extras ───
  'register.nationalIdLabel': { en: 'National ID / Iqama Number', ar: 'رقم الهوية الوطنية / الإقامة' },
  'register.nationalIdPlaceholder': { en: '10-digit National ID', ar: 'رقم الهوية المكون من ١٠ أرقام' },
  'register.emailLabel': { en: 'Email Address', ar: 'البريد الإلكتروني' },
  'register.passwordLabel': { en: 'Password', ar: 'كلمة المرور' },
  'register.passwordPlaceholder': { en: 'Min. 8 characters', ar: 'حد أدنى ٨ أحرف' },
  'register.confirmPassword': { en: 'Confirm Password', ar: 'تأكيد كلمة المرور' },
  'register.reenterPassword': { en: 'Re-enter password', ar: 'أعد إدخال كلمة المرور' },

  // ─── Support Widget extras ───
  'support.yourAccountManager': { en: 'Your Account Manager', ar: 'مدير حسابك' },
  'support.watchVideo': { en: 'Watch Video', ar: 'شاهد الفيديو' },
  'support.seeHow': { en: 'See how FundMe works', ar: 'شاهد كيف يعمل FundMe' },
  'support.chatWithTeam': { en: 'Chat with our team', ar: 'تحدث مع فريقنا' },

  // ─── Loan card data ───
  'loan.workingCapital': { en: 'Working Capital', ar: 'رأس المال العامل' },
  'loan.invoiceFinancing': { en: 'Invoice Financing', ar: 'تمويل الفواتير' },
  'loan.equipmentFinancing': { en: 'Equipment Financing', ar: 'تمويل المعدات' },
  'loan.tradeFinance': { en: 'Trade Finance', ar: 'تمويل التجارة' },
  'loan.nextPaymentOn': { en: 'Next payment on', ar: 'الدفعة القادمة في' },
  'loan.appReceived': { en: 'Your application has been received', ar: 'تم استلام طلبك' },
  'loan.offerReady': { en: 'Your offer is ready', ar: 'عرضك جاهز' },
  'loan.facilityReady': { en: 'Facility contract ready', ar: 'عقد التسهيل جاهز' },
  'loan.funded65': { en: '65% funded · 8 days left', ar: '٦٥٪ ممول · ٨ أيام متبقية' },
  'loan.fullyPaid': { en: 'Congratulations! Loan fully paid', ar: 'تهانينا! تم سداد التمويل بالكامل' },
  'loan.statusActive': { en: 'Active', ar: 'نشط' },
  'loan.statusSubmitted': { en: 'Request Submitted', ar: 'تم تقديم الطلب' },
  'loan.statusOffer': { en: 'Offer', ar: 'عرض' },
  'loan.statusContract': { en: 'Facility Contract', ar: 'عقد التسهيل' },
  'loan.statusCrowdfunding': { en: 'Crowdfunding', ar: 'تمويل جماعي' },
  'loan.statusSettled': { en: 'Settled', ar: 'مسدد' },
  'loan.financingAmount': { en: 'Financing Amount', ar: 'مبلغ التمويل' },

  // ─── Onboarding Wizard ───
  'onboarding.verifyBusiness': { en: 'Verify Business', ar: 'التحقق من النشاط التجاري' },
  'onboarding.accountSetup': { en: 'Account Setup', ar: 'إعداد الحساب' },
  'onboarding.accountVerified': { en: 'Your Account is Verified!', ar: 'تم التحقق من حسابك!' },
  'onboarding.accountVerifiedDesc': { en: 'Congratulations! Your account setup is complete. You can now start requesting financing.', ar: 'تهانينا! اكتمل إعداد حسابك. يمكنك الآن البدء في طلب التمويل.' },
  'onboarding.accountCreated': { en: 'Account Created & Identity Verified', ar: 'تم إنشاء الحساب والتحقق من الهوية' },
  'onboarding.businessVerified': { en: 'Business Verified', ar: 'تم التحقق من النشاط التجاري' },
  'onboarding.bankConnected': { en: 'Bank Account Connected', ar: 'تم ربط الحساب البنكي' },
  'onboarding.goToDashboard': { en: 'Go to Dashboard →', ar: '← الذهاب إلى لوحة التحكم' },
  'onboarding.progressSaved': { en: 'Progress saved automatically', ar: 'يتم حفظ التقدم تلقائياً' },
  'onboarding.step': { en: 'Step', ar: 'الخطوة' },
  'onboarding.exitSetup': { en: 'Exit Setup?', ar: 'الخروج من الإعداد؟' },
  'onboarding.exitDesc': { en: 'Your progress has been saved. You can continue later from your dashboard.', ar: 'تم حفظ تقدمك. يمكنك المتابعة لاحقاً من لوحة التحكم.' },
  'onboarding.exitButton': { en: 'Exit to Dashboard', ar: 'الخروج إلى لوحة التحكم' },
  'onboarding.stayButton': { en: 'Stay & Continue', ar: 'البقاء والمتابعة' },
  'onboarding.selectBusiness': { en: 'Select Your Business', ar: 'اختر نشاطك التجاري' },
  'onboarding.verifiedByWathiq': { en: 'Verified by Wathiq', ar: 'موثق عبر واثق' },
  'onboarding.foundCRs': { en: 'We found 2 commercial registrations linked to your ID', ar: 'وجدنا ٢ سجل تجاري مرتبط بهويتك' },
  'onboarding.addManually': { en: 'Add Another Company Manually', ar: 'إضافة شركة أخرى يدوياً' },
  'onboarding.expires': { en: 'Expires:', ar: 'ينتهي:' },
  'onboarding.type': { en: 'Type:', ar: 'النوع:' },
  'onboarding.cr': { en: 'CR:', ar: 'س.ت:' },
  'onboarding.branch': { en: 'BRANCH', ar: 'فرع' },
  'onboarding.businessFound': { en: 'Business Found', ar: 'تم العثور على النشاط التجاري' },
  'onboarding.confirmDetails': { en: 'Please confirm your business details below', ar: 'يرجى تأكيد تفاصيل نشاطك التجاري أدناه' },
  'onboarding.businessInfo': { en: 'Business Information', ar: 'معلومات النشاط التجاري' },
  'onboarding.crNumber': { en: 'CR Number', ar: 'رقم السجل التجاري' },
  'onboarding.companyNameEn': { en: 'Company Name (EN)', ar: 'اسم الشركة (إنجليزي)' },
  'onboarding.companyNameAr': { en: 'Company Name (AR)', ar: 'اسم الشركة (عربي)' },
  'onboarding.companyType': { en: 'Company Type', ar: 'نوع الشركة' },
  'onboarding.crType': { en: 'CR Type', ar: 'نوع السجل' },
  'onboarding.mainReg': { en: 'Main Registration', ar: 'سجل رئيسي' },
  'onboarding.regDate': { en: 'Registration Date', ar: 'تاريخ التسجيل' },
  'onboarding.expiryDate': { en: 'Expiry Date', ar: 'تاريخ الانتهاء' },
  'onboarding.capital': { en: 'Capital', ar: 'رأس المال' },
  'onboarding.activities': { en: 'Activities', ar: 'الأنشطة' },
  'onboarding.nationalAddress': { en: 'National Address', ar: 'العنوان الوطني' },
  'onboarding.signatories': { en: 'Signatories', ar: 'المفوضون بالتوقيع' },
  'onboarding.notMyBusiness': { en: 'Not My Business', ar: 'ليس نشاطي التجاري' },
  'onboarding.confirmContinue': { en: 'Confirm & Continue', ar: 'تأكيد ومتابعة' },
  'onboarding.lookingUp': { en: 'Looking up your businesses...', ar: 'جارٍ البحث عن أنشطتك التجارية...' },
  'onboarding.fetchingCRs': { en: 'Fetching CRs linked to your National ID via Wathiq', ar: 'جارٍ جلب السجلات التجارية المرتبطة بهويتك عبر واثق' },
  'onboarding.noBusinesses': { en: 'No Businesses Found', ar: 'لم يتم العثور على أنشطة تجارية' },
  'onboarding.noBusinessesDesc': { en: "We couldn't find any commercial registrations linked to your National ID. You can enter a CR number manually.", ar: 'لم نتمكن من العثور على سجلات تجارية مرتبطة بهويتك الوطنية. يمكنك إدخال رقم السجل التجاري يدوياً.' },
  'onboarding.enterCRManually': { en: 'Enter CR Number Manually', ar: 'إدخال رقم السجل التجاري يدوياً' },
  'onboarding.companyInfo': { en: 'Company Information', ar: 'معلومات الشركة' },
  'onboarding.provideDetails': { en: 'Provide your company details', ar: 'أدخل تفاصيل شركتك' },
  'onboarding.permission': { en: 'Permission', ar: 'الصلاحية' },
  'onboarding.continueSelected': { en: 'Continue with Selected Business', ar: 'المتابعة مع النشاط المحدد' },

  // ─── SADAD Bills ───
  'sadad.selectBills': { en: 'Select SADAD Bills to Finance', ar: 'اختر فواتير سداد للتمويل' },
  'sadad.chooseBills': { en: 'Choose which bills you want FundMe to pay', ar: 'اختر الفواتير التي تريد أن يدفعها FundMe' },
  'sadad.connectedInfo': { en: 'Connected to SADAD', ar: 'متصل بسداد' },
  'sadad.billsFound': { en: 'bills found', ar: 'فاتورة' },
  'sadad.billNumber': { en: 'Bill #', ar: 'رقم الفاتورة' },
  'sadad.biller': { en: 'Biller', ar: 'المفوتر' },
  'sadad.amount': { en: 'Amount', ar: 'المبلغ' },
} as const

export type TranslationKey = keyof typeof translations

interface I18nContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: TranslationKey) => string
  isRTL: boolean
  formatNumber: (n: number) => string
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
  isRTL: false,
  formatNumber,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem('fundme-language') as Lang) || 'en')

  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', lang)
    if (lang === 'ar') {
      document.body.style.fontFamily = "'IBM Plex Sans Arabic', 'DM Sans', 'Poppins', sans-serif"
    } else {
      document.body.style.fontFamily = "'DM Sans', 'Poppins', sans-serif"
    }
  }, [lang])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('fundme-language', l)
  }

  function t(key: TranslationKey): string {
    return translations[key]?.[lang] ?? key
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t, isRTL: lang === 'ar', formatNumber }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
