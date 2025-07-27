
import React from 'react';
import { ProfileFormValues } from './profile-form';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';

interface ResumeTemplateProps {
  profile: ProfileFormValues;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={className}>
        <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-1 mb-2 text-gray-800">{title.toUpperCase()}</h2>
        <div className="text-gray-700">
            {children}
        </div>
    </div>
);

const SectionCompact: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={className}>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="text-sm text-gray-600">
            {children}
        </div>
    </div>
);


export const ResumeTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({ profile }, ref) => {
    return (
        <div ref={ref} className="bg-white text-gray-900 p-8" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'sans-serif' }}>
            <header className="text-center mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{profile.fullName}</h1>
                <div className="flex justify-center items-center gap-x-4 gap-y-1 text-xs text-gray-600 mt-2 flex-wrap">
                    {profile.email && <span className="flex items-center gap-1"><Mail size={12}/> {profile.email}</span>}
                    {profile.phone && <span className="flex items-center gap-1"><Phone size={12}/> {profile.phone}</span>}
                    {profile.address && <span className="flex items-center gap-1"><MapPin size={12}/> {profile.address}</span>}
                    {profile.portfolio && <a href={profile.portfolio} className="flex items-center gap-1"><Globe size={12}/> {profile.portfolio}</a>}
                </div>
            </header>

            <main className="space-y-6">
                {profile.summary && (
                    <Section title="Professional Summary">
                        <p className="text-sm">{profile.summary}</p>
                    </Section>
                )}

                {profile.experience && profile.experience.length > 0 && (
                    <Section title="Work Experience">
                        <div className="space-y-4">
                            {profile.experience.map((exp, index) => (
                                <div key={index}>
                                    <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
                                    <div className="flex justify-between text-sm font-medium text-gray-600">
                                        <span>{exp.company}</span>
                                        <span>{exp.years}</span>
                                    </div>
                                    <p className="text-sm mt-1">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </Section>
                )}

                <div className="grid grid-cols-2 gap-8">
                    {profile.education && profile.education.length > 0 && (
                        <Section title="Education">
                            <div className="space-y-3">
                                {profile.education.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="text-md font-semibold text-gray-800">{edu.degree}</h3>
                                        <p className="text-sm text-gray-600">{edu.school} - {edu.year}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {profile.skills && profile.skills.length > 0 && (
                        <Section title="Skills">
                             <div className="flex flex-wrap gap-2">
                                {profile.skills.map((skill, index) => (
                                    <span key={index} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">{skill.value}</span>
                                ))}
                            </div>
                        </Section>
                    )}
                </div>


                {profile.certifications && profile.certifications.length > 0 && (
                     <Section title="Certifications">
                        <div className="space-y-2">
                            {profile.certifications.map((cert, index) => (
                                <div key={index} className="text-sm">
                                    <span className="font-semibold">{cert.name}</span>
                                    <span className="text-gray-600"> - {cert.issuingBody} ({cert.year})</span>
                                </div>
                            ))}
                        </div>
                    </Section>
                )}
                 {profile.driversLicense?.hasLicense && (
                     <Section title="Additional Information">
                        <div className="text-sm">
                           <span className="font-semibold">Driver's License:</span>
                           <span className="text-gray-600"> {profile.driversLicense.licenseDetails || 'Yes'}</span>
                        </div>
                    </Section>
                )}

            </main>
        </div>
    );
});

ResumeTemplate.displayName = 'ResumeTemplate';
