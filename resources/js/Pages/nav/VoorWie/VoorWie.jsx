import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import LiDarViewer from "../../../Components/LiDarViewer"; 
import "bootstrap-icons/font/bootstrap-icons.css"; 

// Reusable Section Component
const Section = ({ title, children }) => (
    <section className="py-12 bg-gray-200 dark:bg-gray-900">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">{title}</h2>
            {children}
        </div>
    </section>
);

// Reusable Card Component
const Card = ({ title, items }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
        <ul className="space-y-3">
            {items.map((item, index) => (
                <li key={index} className="flex items-start">
                    <i className="bi bi-check2-all text-green-500 mr-3"></i>
                    <span className="text-gray-800 dark:text-gray-300">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

// Reusable List Component
const List = ({ items }) => (
    <ul className="space-y-3">
        {items.map((item, index) => (
            <li key={index} className="flex items-start">
                <i className="bi bi-check2-all text-green-500 mr-3"></i>
                <span className="text-gray-800 dark:text-gray-300">{item}</span>
            </li>
        ))}
    </ul>
);

export default function VoorWie() {
    const sections = [
        {
            title: "Vastgoedonderhoudspartijen",
            items: [
                "Inmeten van platte daken voor inspectie en onderhoudsplanning.",
                "Vastleggen van oppervlaktes voor zonnepaneleninstallatie.",
                "Beheer van kozijnen, beglazing, en schilderwerk.",
            ],
        },
        {
            title: "Beleggers en beleggingsfondsen",
            items: [
                "Overzicht van objecten, inclusief locatie en onderhoudsstatus.",
                "Digitaliseer je vastgoedportefeuille.",
                "Real-time inzichten voor betere beslissingen.",
            ],
        },
        {
            title: "Taxateurs van vastgoed",
            items: [
                "Snelle en foutloze objectopnames.",
                "Visuele weergave van objecten met foto’s en metingen.",
                "Automatisch gegenereerde opnameverslagen.",
            ],
        },
        {
            title: "Huurprijsbepaling volgens WWS",
            items: [
                "Berekening van maximale huurprijs volgens WWS-criteria.",
                "Objectieve en gedetailleerde opnames.",
                "Identificeer verbeterpunten die de puntenscore verhogen.",
            ],
        },
    ];

    const benefits = [
        "Digitaal dossier met actuele gegevens van objecten.",
        "Automatiseer processen zoals taxaties en onderhoudsopnames.",
        "Maak betere beslissingen met heldere rapportages.",
    ];

    return (
        <AuthenticatedLayout>
              
            <Head>
                <title >Voor Wie - ImmoScan</title>
                <meta
                    name="description"
                    content="Ontdek wie baat heeft bij ImmoScan.app en hoe het helpt bij vastgoedbeheer."
                />
            </Head>

         <div  className="py-40">

            {/* "Voor Wie" Section */}
            <Section title="Voor Wie is ImmoScan.app?">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-24">
                    {sections.map((section, index) => (
                        <Card key={index} title={section.title} items={section.items} />
                    ))}
                </div>
            </Section>

      
               {/* LiDAR Viewer Section */}
               <Section title="Visualiseer Je Vastgoed">
                    <div className="flex justify-center">
                        <LiDarViewer filePath="/path/to/model.ply" />
                    </div>
                </Section>
                      {/* Benefits Section */}
            <Section title="Waarom kiezen onze klanten voor ImmoScan.app?">
                <div className="bg-white     dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <List items={benefits} />
                </div>
                <div className="text-center mt-8">
                    <a
                        href="/prijzen"
                        className="inline-block bg-green-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-green-700"
                    >
                       Ontdek onze prijs
                    </a>
                </div>
            </Section>
   </div>
        </AuthenticatedLayout>
    );
}